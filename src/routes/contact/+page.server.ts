import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY, CONTACT_EMAIL } from '$env/static/private';
import type { Actions } from './$types';

const resend = new Resend(RESEND_API_KEY);

// Where contact form submissions are sent
const recipientEmail = CONTACT_EMAIL || 'judson@eliasimmersive.com';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const phone = formData.get('phone') as string;
		const service = formData.get('service') as string;
		const message = formData.get('message') as string;

		// Basic validation
		if (!name || !email || !message) {
			return fail(400, {
				error: 'Please fill in all required fields.',
				name,
				email,
				phone,
				service,
				message
			});
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				error: 'Please enter a valid email address.',
				name,
				email,
				phone,
				service,
				message
			});
		}

		try {
			await resend.emails.send({
				from: 'Elias Immersive <onboarding@resend.dev>',
				to: recipientEmail,
				replyTo: email,
				subject: `New Contact Form: ${service || 'General Inquiry'} - ${name}`,
				html: `
					<h2>New Contact Form Submission</h2>
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
					<p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
					<hr>
					<h3>Message:</h3>
					<p>${message.replace(/\n/g, '<br>')}</p>
				`
			});

			return { success: true };
		} catch (err) {
			console.error('Failed to send email:', err);
			return fail(500, {
				error: 'Failed to send message. Please try again or email us directly.',
				name,
				email,
				phone,
				service,
				message
			});
		}
	}
} satisfies Actions;
