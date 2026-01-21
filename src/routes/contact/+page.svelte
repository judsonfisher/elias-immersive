<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();

	let submitting = $state(false);
</script>

<svelte:head>
	<title>Contact | Elias Immersive</title>
	<meta name="description" content="Get in touch with Elias Immersive for virtual tours, aerial mapping, and 3D modeling services." />
</svelte:head>

<section class="contact-hero">
	<div class="container">
		<h1>Get in Touch</h1>
		<p>Ready to bring your space to life? Let's discuss your project.</p>
	</div>
</section>

<section class="contact-content section">
	<div class="container">
		<div class="contact-grid">
			<div class="contact-info">
				<h2>Let's Talk</h2>
				<p>
					Whether you're looking for a virtual tour, aerial mapping, or 3D model,
					we'd love to hear about your project. Fill out the form and we'll get back
					to you within 24 hours.
				</p>

				<div class="info-items">
					<div class="info-item">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
							<polyline points="22,6 12,13 2,6"></polyline>
						</svg>
						<div>
							<h4>Email</h4>
							<a href="mailto:info@eliasimmersive.com">info@eliasimmersive.com</a>
						</div>
					</div>
				</div>

				<div class="services-list">
					<h3>Our Services</h3>
					<ul>
						<li>Virtual Tours</li>
						<li>Aerial Mapping</li>
						<li>3D Modeling</li>
						<li>Property Documentation</li>
						<li>Site Planning</li>
					</ul>
				</div>
			</div>

			<div class="contact-form-container">
				{#if form?.success}
					<div class="success-message">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
							<polyline points="22 4 12 14.01 9 11.01"></polyline>
						</svg>
						<h3>Message Sent!</h3>
						<p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
					</div>
				{:else}
					<form
						method="POST"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								await update();
								submitting = false;
							};
						}}
					>
						<div class="form-group">
							<label for="name">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								required
								placeholder="Your name"
							/>
						</div>

						<div class="form-group">
							<label for="email">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								required
								placeholder="your@email.com"
							/>
						</div>

						<div class="form-group">
							<label for="phone">Phone (optional)</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								placeholder="(555) 123-4567"
							/>
						</div>

						<div class="form-group">
							<label for="service">Service Interest</label>
							<select id="service" name="service">
								<option value="">Select a service</option>
								<option value="virtual-tour">Virtual Tour</option>
								<option value="aerial-mapping">Aerial Mapping</option>
								<option value="3d-modeling">3D Modeling</option>
								<option value="multiple">Multiple Services</option>
								<option value="other">Other / Not Sure</option>
							</select>
						</div>

						<div class="form-group">
							<label for="message">Message</label>
							<textarea
								id="message"
								name="message"
								rows="5"
								required
								placeholder="Tell us about your project..."
							></textarea>
						</div>

						{#if form?.error}
							<p class="error-message">{form.error}</p>
						{/if}

						<button type="submit" class="btn btn-primary" disabled={submitting}>
							{submitting ? 'Sending...' : 'Send Message'}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.contact-hero {
		padding: var(--spacing-xl) 0 var(--spacing-lg);
		text-align: center;
		background-color: var(--color-background);
	}

	.contact-hero h1 {
		margin-bottom: var(--spacing-sm);
	}

	.contact-hero p {
		color: var(--color-text-light);
		font-size: 1.125rem;
		max-width: 500px;
		margin: 0 auto;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-xl);
	}

	.contact-info h2 {
		margin-bottom: var(--spacing-sm);
	}

	.contact-info > p {
		color: var(--color-text-light);
		line-height: 1.7;
		margin-bottom: var(--spacing-md);
	}

	.info-items {
		margin-bottom: var(--spacing-md);
	}

	.info-item {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.info-item svg {
		width: 1.5rem;
		height: 1.5rem;
		color: var(--color-primary);
		flex-shrink: 0;
		margin-top: 0.25rem;
	}

	.info-item h4 {
		font-size: 0.875rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
		font-family: var(--font-sans);
	}

	.info-item a {
		color: var(--color-text-light);
		font-size: 0.9rem;
		transition: color var(--transition-fast);
	}

	.info-item a:hover {
		color: var(--color-primary);
	}

	.services-list h3 {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		font-family: var(--font-sans);
	}

	.services-list ul {
		list-style: none;
	}

	.services-list li {
		color: var(--color-text-light);
		font-size: 0.9rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	.contact-form-container {
		background-color: var(--color-background-light);
		padding: var(--spacing-md);
		border-radius: 8px;
		border: 1px solid var(--color-border);
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 0.875rem 1rem;
		font-size: 1rem;
		font-family: var(--font-sans);
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background-color: white;
		transition: border-color var(--transition-fast);
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	textarea {
		resize: vertical;
		min-height: 120px;
	}

	button[type="submit"] {
		width: 100%;
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.error-message {
		color: #d32f2f;
		font-size: 0.875rem;
		margin-bottom: 1rem;
	}

	.success-message {
		text-align: center;
		padding: var(--spacing-lg);
	}

	.success-message svg {
		width: 3rem;
		height: 3rem;
		color: var(--color-primary);
		margin-bottom: 1rem;
	}

	.success-message h3 {
		font-family: var(--font-sans);
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.success-message p {
		color: var(--color-text-light);
	}

	@media (max-width: 768px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-lg);
		}
	}
</style>
