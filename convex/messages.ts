import {
	httpAction,
	internalAction,
	internalMutation,
	query,
} from './_generated/server';
import { Doc } from '../convex/_generated/dataModel';
import { internal } from './_generated/api';

// let Convex define the type, leaving out generated fields
type Message = Omit<Doc<'messages'>, '_id' | '_creationTime'>;
type QueryArgs = Pick<Doc<'messages'>, 'sender'>;

export const get = query({
	handler: async (ctx, { sender }: QueryArgs) => {
		if (!sender) {
			return [];
		}

		const messages = await ctx.db
			.query('messages')
			.withIndex('by_sender', (q) => q.eq('sender', sender))
			.collect();

		return messages;
	},
});

/*
 * An HTTP action exposes an endpoint, which we’ll add as the webhook URL for
 * incoming Twilio SMS messages. This will be called every time someone texts
 * the phone number provided by our app.
 */
export const save = httpAction(async (ctx, req) => {
	const body = await req.text();

	/*
	 * For details on the parameters sent to webhooks by Twilio, see the docs:
	 * https://www.twilio.com/docs/messaging/guides/webhook-request
	 */
	const message = new URLSearchParams(body);
	const text = message.get('Body') ?? '';
	const sender = message.get('From');
	const imageUrl = message.get('MediaUrl0');

	if (!sender) {
		return new Response(null, {
			status: 400,
		});
	}

	let msg: Message = {
		text,
		sender,
		image: null,
	};

	if (imageUrl) {
		try {
			msg.image = await ctx.runAction(internal.messages.storeImage, {
				imageUrl,
			});
		} catch (err) {
			console.error(`failed to store image (url: ${imageUrl})`);
		}
	}

	ctx.runMutation(internal.messages.saveMessage, msg);

	return new Response(null, {
		status: 200,
	});
});

export const saveMessage = internalMutation(async (ctx, args: Message) => {
	await ctx.db.insert('messages', args);
});

export const storeImage = internalAction(
	async (ctx, { imageUrl }: { imageUrl: string }) => {
		const res = await fetch(imageUrl);

		if (!res.ok) {
			console.error(res);
			return null;
		}

		const blob = await res.blob();
		const id = await ctx.storage.store(blob);
		const url = await ctx.storage.getUrl(id);

		return { id, url };
	},
);
