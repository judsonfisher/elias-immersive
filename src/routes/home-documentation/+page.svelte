<script lang="ts">
	import { SEO } from '$lib/components';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const page = data.landingPage;

	let submitting = $state(false);
	let submitted = $state(false);
	let error = $state('');
	let showStickyCta = $state(false);

	onMount(() => {
		const handleScroll = () => {
			showStickyCta = window.scrollY > 500;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		submitting = true;
		error = '';

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			const response = await fetch('https://formspree.io/f/mojdvkzw', {
				method: 'POST',
				body: formData,
				headers: {
					'Accept': 'application/json'
				}
			});

			if (response.ok) {
				submitted = true;
				form.reset();
			} else {
				const responseData = await response.json();
				error = responseData.errors?.map((e: any) => e.message).join(', ') || 'Something went wrong. Please try again.';
			}
		} catch (e) {
			error = 'Something went wrong. Please try again.';
		} finally {
			submitting = false;
		}
	}

	const seoTitle = page.seo?.metaTitle || 'Home Documentation & Digital Twins | Elias Immersive';
	const seoDescription = page.seo?.metaDescription || 'Protect your home with comprehensive digital documentation. 3D scans and virtual walkthroughs for insurance claims, estate planning, and peace of mind.';
</script>

<SEO
	title={seoTitle}
	description={seoDescription}
	image={data.solutionImageUrl || undefined}
/>

<svelte:head>
	<title>{seoTitle}</title>
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="container">
		<div class="hero-grid">
			<div class="hero-content">
				{#if page.heroEyebrow}
					<p class="hero-eyebrow">{page.heroEyebrow}</p>
				{/if}
				<h1 class="hero-headline">{page.heroHeadline}</h1>
				{#if page.heroSubheadline}
					<p class="hero-subheadline">{page.heroSubheadline}</p>
				{/if}
				{#if page.heroSolution}
					<p class="hero-solution">
						<strong>There's a better way.</strong> {page.heroSolution.replace("There's a better way. ", '')}
					</p>
				{/if}
				<a href="#consultation" class="btn btn-primary btn-lg">{page.heroCta || 'Book a Free Consultation'}</a>
			</div>
			<div class="hero-visual">
				{#if data.heroImageUrl}
					<img src={data.heroImageUrl} alt="3D digital twin model of a home" class="hero-image" />
				{:else}
					<div class="video-placeholder">
						<div class="play-icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
								<path d="M8 5v14l11-7z"/>
							</svg>
						</div>
						<span>Explainer Video Coming Soon</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- Problem Section -->
{#if page.problemStats && page.problemStats.length > 0}
<section class="problem section bg-light">
	<div class="container">
		<h2 class="section-title text-center">{page.problemTitle || 'The Problem With Memory'}</h2>
		<div class="problem-grid">
			{#each page.problemStats as stat}
				<div class="problem-card">
					<div class="problem-stat">{stat.stat}</div>
					<p>{stat.description}</p>
				</div>
			{/each}
		</div>
		{#if page.problemSummary}
			<p class="problem-summary text-center">{page.problemSummary}</p>
		{/if}
	</div>
</section>
{/if}

<!-- Solution Section -->
<section class="solution section">
	<div class="container">
		<div class="solution-content">
			<div class="solution-text">
				<h2 class="section-title">{page.solutionTitle || 'Your Home, Digitally Preserved'}</h2>
				{#if page.solutionDescription}
					<p>{page.solutionDescription}</p>
				{/if}
				{#if page.solutionFeatures && page.solutionFeatures.length > 0}
					<ul class="solution-list">
						{#each page.solutionFeatures as feature}
							<li>{feature}</li>
						{/each}
					</ul>
				{/if}
			</div>
			<div class="solution-visual">
				{#if data.matterportEmbedUrl}
					<div class="matterport-embed">
						<iframe
							src={data.matterportEmbedUrl}
							title="Interactive 3D Home Tour"
							allowfullscreen
							allow="xr-spatial-tracking"
						></iframe>
					</div>
					<p class="matterport-caption">Navigate through this interactive tour and click the tags to see how we document your home's details.</p>
				{:else if data.solutionImageUrl}
					<img src={data.solutionImageUrl} alt={page.solutionImageCaption || 'Digital twin preview'} />
				{:else}
					<div class="visual-placeholder">
						<span>{page.solutionImageCaption || 'Interactive 3D Preview'}</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- Use Cases Section -->
{#if page.useCases && page.useCases.length > 0}
<section class="use-cases section bg-light">
	<div class="container">
		<h2 class="section-title text-center">{page.useCasesTitle || 'More Than Insurance'}</h2>
		{#if page.useCasesIntro}
			<p class="use-cases-intro text-center">{page.useCasesIntro}</p>
		{/if}
		<div class="use-cases-grid">
			{#each page.useCases as useCase}
				<div class="use-case-card">
					<h3>{useCase.title}</h3>
					<p>{useCase.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Process Section -->
{#if page.processSteps && page.processSteps.length > 0}
<section class="process section">
	<div class="container">
		<h2 class="section-title text-center">{page.processTitle || 'Simple, Non-Invasive Process'}</h2>
		<div class="process-steps">
			{#each page.processSteps as step, i}
				<div class="process-step">
					<div class="step-number">{i + 1}</div>
					<h3>{step.title}</h3>
					<p>{step.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- FAQ Section -->
{#if page.faqs && page.faqs.length > 0}
<section class="faq section bg-light">
	<div class="container">
		<h2 class="section-title text-center">{page.faqTitle || 'Frequently Asked Questions'}</h2>
		<div class="faq-list">
			{#each page.faqs as faq, i}
				<details class="faq-item">
					<summary class="faq-question">
						{faq.question}
						<svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</summary>
					<p class="faq-answer">{faq.answer}</p>
				</details>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Trust Section -->
{#if page.trustTitle || page.trustContent}
<section class="trust section">
	<div class="container">
		<div class="trust-content">
			{#if page.trustTitle}
				<h2 class="section-title">{page.trustTitle}</h2>
			{/if}
			{#if page.trustContent}
				{#each page.trustContent.split('\n\n') as paragraph}
					<p>{paragraph}</p>
				{/each}
			{/if}
		</div>
	</div>
</section>
{/if}

<!-- CTA / Form Section -->
<section id="consultation" class="consultation section">
	<div class="container">
		<div class="consultation-wrapper">
			<div class="consultation-text">
				<h2 class="section-title">{page.ctaTitle || 'Book Your Free Consultation'}</h2>
				{#if page.ctaDescription}
					<p>{page.ctaDescription}</p>
				{/if}
				{#if page.ctaBenefits && page.ctaBenefits.length > 0}
					<ul class="consultation-benefits">
						{#each page.ctaBenefits as benefit}
							<li>{benefit}</li>
						{/each}
					</ul>
				{/if}
			</div>
			<div class="consultation-form">
				{#if submitted}
					<div class="success-message">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
							<polyline points="22 4 12 14.01 9 11.01"></polyline>
						</svg>
						<h3>Thank You!</h3>
						<p>We've received your request and will be in touch within 24 hours to schedule your consultation.</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit}>
						<div class="form-group">
							<label for="name">Name <span class="required">*</span></label>
							<input type="text" id="name" name="name" required />
						</div>

						<div class="form-group">
							<label for="email">Email <span class="required">*</span></label>
							<input type="email" id="email" name="email" required />
						</div>

						<div class="form-group">
							<label for="phone">Phone <span class="required">*</span></label>
							<input type="tel" id="phone" name="phone" required />
						</div>

						<div class="form-group">
							<label for="message">Tell us about your property <span class="required">*</span></label>
							<textarea
								id="message"
								name="message"
								rows="3"
								placeholder="Approximate size, any specific areas of interest, etc."
								required
							></textarea>
						</div>

						<!-- Hidden field to identify lead source -->
						<input type="hidden" name="source" value="ad-landing-page-home-documentation" />

						{#if error}
							<p class="error-message">{error}</p>
						{/if}

						<button type="submit" class="btn btn-primary btn-full" disabled={submitting}>
							{submitting ? 'Submitting...' : 'Request Consultation'}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- Sticky CTA -->
{#if showStickyCta}
	<div class="sticky-cta">
		<div class="sticky-cta-content">
			<span class="sticky-cta-text">Ready to protect your home?</span>
			<a href="#consultation" class="btn btn-primary">Book Free Consultation</a>
		</div>
	</div>
{/if}

<style>
	/* Hero Section */
	.hero {
		padding: var(--spacing-xl) 0;
		background: linear-gradient(135deg, var(--color-background) 0%, #e8e8e0 100%);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-lg);
		align-items: center;
	}

	.hero-content {
		text-align: left;
	}

	.hero-eyebrow {
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-primary);
		margin-bottom: var(--spacing-sm);
		font-weight: 500;
	}

	.hero-headline {
		font-size: clamp(2rem, 4vw, 3rem);
		line-height: 1.1;
		margin-bottom: var(--spacing-md);
	}

	.hero-subheadline {
		font-size: 1.125rem;
		color: var(--color-text-light);
		line-height: 1.7;
		margin-bottom: var(--spacing-sm);
	}

	.hero-solution {
		font-size: 1rem;
		line-height: 1.7;
		margin-bottom: var(--spacing-md);
	}

	.hero-visual {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.hero-image {
		width: 100%;
		height: auto;
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
	}

	.video-placeholder {
		width: 100%;
		aspect-ratio: 16/9;
		background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
	}

	.play-icon {
		width: 64px;
		height: 64px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.5);
	}

	.play-icon svg {
		width: 32px;
		height: 32px;
	}

	.video-placeholder span {
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.875rem;
	}

	.btn-lg {
		padding: 1rem 2rem;
		font-size: 1rem;
	}

	/* Problem Section */
	.problem-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-md);
	}

	.problem-card {
		text-align: center;
		padding: var(--spacing-md);
	}

	.problem-stat {
		font-family: var(--font-secondary);
		font-size: clamp(2.5rem, 4vw, 3.5rem);
		font-weight: 600;
		color: var(--color-primary);
		margin-bottom: var(--spacing-xs);
	}

	.problem-card p {
		color: var(--color-text-light);
		font-size: 1rem;
		margin: 0;
	}

	.problem-summary {
		max-width: 700px;
		margin: 0 auto;
		font-size: 1.125rem;
		color: var(--color-text);
	}

	/* Solution Section */
	.solution-content {
		display: grid;
		grid-template-columns: 1fr 1.4fr;
		gap: var(--spacing-lg);
		align-items: start;
	}

	.solution-text p {
		color: var(--color-text-light);
		font-size: 1.125rem;
		line-height: 1.8;
	}

	.solution-list {
		list-style: none;
		margin: var(--spacing-md) 0;
	}

	.solution-list li {
		position: relative;
		padding-left: 1.5rem;
		margin-bottom: 0.75rem;
		color: var(--color-text);
	}

	.solution-list li::before {
		content: "✓";
		position: absolute;
		left: 0;
		color: var(--color-primary);
		font-weight: 600;
	}

	.solution-visual img {
		width: 100%;
		height: auto;
		border-radius: 8px;
	}

	.matterport-embed {
		position: relative;
		width: 100%;
		aspect-ratio: 4/3;
		border-radius: 8px;
		overflow: hidden;
		min-height: 450px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
	}

	.matterport-embed iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: none;
	}

	.matterport-caption {
		margin-top: 1rem;
		font-size: 0.9375rem;
		color: var(--color-text-light);
		text-align: center;
		font-style: italic;
	}

	.visual-placeholder {
		aspect-ratio: 4/3;
		background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #666;
		font-size: 1rem;
	}

	/* Use Cases Section */
	.use-cases-intro {
		max-width: 600px;
		margin: 0 auto var(--spacing-lg);
		color: var(--color-text-light);
		font-size: 1.125rem;
	}

	.use-cases-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-md);
	}

	.use-case-card {
		background: var(--color-background);
		padding: var(--spacing-md);
		border-radius: 8px;
	}

	.use-case-card h3 {
		font-size: 1.25rem;
		margin-bottom: var(--spacing-xs);
	}

	.use-case-card p {
		color: var(--color-text-light);
		margin: 0;
		font-size: 1rem;
	}

	/* Process Section */
	.process-steps {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--spacing-md);
		margin-top: var(--spacing-lg);
	}

	.process-step {
		text-align: center;
	}

	.step-number {
		width: 3rem;
		height: 3rem;
		background: var(--color-primary);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-secondary);
		font-weight: 600;
		font-size: 1.25rem;
		margin: 0 auto var(--spacing-sm);
	}

	.process-step h3 {
		font-size: 1.125rem;
		margin-bottom: var(--spacing-xs);
	}

	.process-step p {
		color: var(--color-text-light);
		font-size: 0.9375rem;
		margin: 0;
	}

	/* FAQ Section */
	.faq-list {
		max-width: 800px;
		margin: 0 auto;
	}

	.faq-item {
		background: var(--color-background);
		border-radius: 8px;
		margin-bottom: 1rem;
		overflow: hidden;
	}

	.faq-question {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.25rem 1.5rem;
		font-weight: 500;
		font-size: 1.0625rem;
		cursor: pointer;
		list-style: none;
		transition: background-color 0.2s ease;
	}

	.faq-question::-webkit-details-marker {
		display: none;
	}

	.faq-question:hover {
		background: rgba(0, 0, 0, 0.02);
	}

	.faq-icon {
		width: 20px;
		height: 20px;
		color: var(--color-text-light);
		transition: transform 0.2s ease;
		flex-shrink: 0;
		margin-left: 1rem;
	}

	.faq-item[open] .faq-icon {
		transform: rotate(180deg);
	}

	.faq-answer {
		padding: 0 1.5rem 1.25rem;
		color: var(--color-text-light);
		line-height: 1.7;
		margin: 0;
	}

	/* Trust Section */
	.trust-content {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.trust-content p {
		font-size: 1.125rem;
		line-height: 1.8;
		color: var(--color-text-light);
	}

	/* Consultation Section */
	.consultation {
		background: var(--color-background);
	}

	.consultation-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-lg);
		align-items: start;
	}

	.consultation-text p {
		font-size: 1.125rem;
		color: var(--color-text-light);
		line-height: 1.7;
		margin-bottom: var(--spacing-md);
	}

	.consultation-benefits {
		list-style: none;
	}

	.consultation-benefits li {
		position: relative;
		padding-left: 1.5rem;
		margin-bottom: 0.5rem;
		color: var(--color-text);
	}

	.consultation-benefits li::before {
		content: "→";
		position: absolute;
		left: 0;
		color: var(--color-primary);
	}

	.consultation-form {
		background: white;
		padding: var(--spacing-md);
		border-radius: 8px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	}

	/* Form Styles */
	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.form-group {
		margin-bottom: 1.25rem;
	}

	.form-group label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.required {
		color: var(--color-primary);
	}

	.optional {
		color: var(--color-text-light);
		font-weight: 400;
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		width: 100%;
		padding: 0.875rem 1rem;
		font-size: 1rem;
		font-family: var(--font-primary);
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background-color: white;
		transition: border-color var(--transition-fast);
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.form-group textarea {
		resize: vertical;
		min-height: 80px;
	}

	.form-group select {
		cursor: pointer;
	}

	.btn-full {
		width: 100%;
	}

	.btn-full:disabled {
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
		padding: var(--spacing-md);
	}

	.success-message svg {
		width: 3rem;
		height: 3rem;
		color: var(--color-primary);
		margin-bottom: 1rem;
	}

	.success-message h3 {
		font-family: var(--font-primary);
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.success-message p {
		color: var(--color-text-light);
		margin: 0;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.hero-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.hero-content {
			text-align: center;
			order: 1;
		}

		.hero-visual {
			order: 2;
		}

		.problem-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.process-steps {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--spacing-md);
		}

		.solution-content,
		.consultation-wrapper {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}
	}

	@media (max-width: 768px) {
		.problem-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-sm);
		}

		.problem-card {
			padding: var(--spacing-sm);
		}

		.use-cases-grid {
			grid-template-columns: 1fr;
		}

		.process-steps {
			grid-template-columns: 1fr;
		}

		.form-row {
			grid-template-columns: 1fr;
			gap: 0;
		}

		.hero-headline {
			font-size: 2rem;
		}

		.sticky-cta {
			padding: 0.75rem var(--spacing-sm);
		}

		.sticky-cta-text {
			display: none;
		}

		.sticky-cta .btn {
			width: 100%;
		}
	}

	/* Sticky CTA */
	.sticky-cta {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: white;
		padding: 1rem var(--spacing-md);
		box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
		z-index: 100;
		animation: slideUp 0.3s ease-out;
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}

	.sticky-cta-content {
		max-width: var(--container-max-width, 1400px);
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-md);
	}

	.sticky-cta-text {
		font-weight: 500;
		color: var(--color-text);
	}
</style>
