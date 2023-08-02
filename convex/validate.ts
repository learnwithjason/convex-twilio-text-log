'use node';

import { v } from 'convex/values';
import twilio from 'twilio';
import { internalAction } from './_generated/server';

export const twilioWebhook = internalAction({
	args: {
		signature: v.string(),
		url: v.string(),
		params: v.any(), // Twilio sends a lot of fields that might vary
	},
	handler: async (_, args) => {
		return twilio.validateRequest(
			process.env.TWILIO_AUTH_TOKEN!,
			args.signature,
			args.url,
			args.params,
		);
	},
});
