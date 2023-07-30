import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	messages: defineTable({
		text: v.string(),
		sender: v.string(),
		image: v.union(
			v.object({
				id: v.string(),
				url: v.union(v.string(), v.null()),
			}),
			v.null(),
		),
	}).index('by_sender', ['sender']),
});
