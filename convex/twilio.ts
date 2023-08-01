'use node';

import twilio from 'twilio';
import { internalAction } from './_generated/server';

export const validateTwilioWebhook = internalAction(
	async (
		_,
		{
			webhookUrl,
			twilioSignature,
			params,
		}: {
			webhookUrl: string;
			twilioSignature: string;
			params: object;
		},
	) => {
		return twilio.validateRequest(
			process.env.TWILIO_AUTH_TOKEN!,
			twilioSignature,
			webhookUrl,
			params,
		);
	},
);
