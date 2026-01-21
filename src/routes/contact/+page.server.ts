import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString();
		const email = formData.get('email')?.toString();
		const phone = formData.get('phone')?.toString();
		const service = formData.get('service')?.toString();
		const message = formData.get('message')?.toString();

		// Basic validation
		if (!name || !email || !message) {
			return fail(400, {
				error: 'Please fill in all required fields.',
				success: false
			});
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				error: 'Please enter a valid email address.',
				success: false
			});
		}

		// Here you would typically:
		// 1. Send an email notification
		// 2. Store the submission in a database
		// 3. Integrate with a CRM or form service

		// For now, we'll just log the submission and return success
		console.log('Contact form submission:', {
			name,
			email,
			phone,
			service,
			message,
			timestamp: new Date().toISOString()
		});

		// You can integrate with services like:
		// - Resend for email
		// - Sanity for storing submissions
		// - Formspree or Netlify Forms
		// - SendGrid, Mailgun, etc.

		return {
			success: true
		};
	}
};
