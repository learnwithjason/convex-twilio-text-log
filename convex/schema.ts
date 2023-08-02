import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const MessageFields = {
	text: v.string(),
	sender: v.string(),
	image: v.union(
		v.object({
			id: v.string(),
			url: v.union(v.string(), v.null()),
		}),
		v.null(),
	),
};

export default defineSchema({
	messages: defineTable(MessageFields).index('by_sender', ['sender']),
});
