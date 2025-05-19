import { config } from 'dotenv';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import { VERIFY_EMAIL_TEMPLATE_ID } from './constants';

config({ path: '.env' }); // or .env.local

const mailersend = new MailerSend({
	apiKey: process.env.MAILER_SEND_KEY!
});

export const sendVerifyEmail = async (user: { email: string; name: string }, token: string) => {
	if (!mailersend || !process.env.EMAIL_FROM || !process.env.EMAIL_FROM_NAME || !user) {
		throw new Error('MailerSend is not configured properly');
	}

	const recipients = [new Recipient(user.email!, user.name ?? 'Friend')];
	const sender = new Sender(process.env.EMAIL_FROM, process.env.EMAIL_FROM_NAME);

	const personalization = [
		{
			email: user.email!,
			data: {
				name: user.name,
				token
			}
		}
	];

	const emailParams = new EmailParams()
		.setFrom(sender)
		.setTo(recipients)
		.setSubject('Welcome to FitTracker from Outdoor Fun Network!')
		.setTemplateId(VERIFY_EMAIL_TEMPLATE_ID)
		.setPersonalization(personalization);

	try {
		await mailersend.email.send(emailParams);
	} catch (error) {
		console.error('Error sending email:', error);
		throw new Error('Failed to send email');
	}
};
