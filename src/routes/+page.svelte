<script lang="ts">
	import { enhance } from '$app/forms';
	import { ServiceCard, ProjectCard, Accordion, ArrowButton } from '$lib/components';
	import type { PageData, ActionData } from './$types';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();
	let submitting = $state(false);
</script>

<svelte:head>
	<title>Elias Immersive | Virtual Tours, Aerial Mapping & 3D Modeling</title>
	<meta name="description" content="We create digital representations of physical spaces using advanced imaging technology. Virtual tours, aerial mapping, and 3D modeling services." />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="container">
		<div class="hero-content">
			<div class="hero-text">
				<h1 class="hero-title">{data.homePage?.heroTitle || 'Precision Capture.'}</h1>
				<h1 class="hero-subtitle">{data.homePage?.heroSubtitle || 'Interactive Results.'}</h1>
				<p class="hero-description">
					{data.homePage?.heroDescription || 'We create digital representations of physical spaces using advanced imaging technology. Deliverables include virtual tours, aerial mapping, and 3D modeling. Our work gives both clients and viewers a clear, measurable way to showcase and understand scale, layout, and spatial flow—without guesswork or abstraction.'}
				</p>
				<a href="/contact" class="btn btn-primary">Contact Us</a>
			</div>
			<div class="hero-image">
				{#if data.homePage?.heroImage}
					<img src={data.heroImageUrl} alt="3D model viewer on laptop" />
				{:else}
					<div class="placeholder-hero"></div>
				{/if}
			</div>
		</div>
		<div class="hero-nav">
			<a href="#services" class="hero-nav-link">
				Services
				<ArrowButton ariaLabel="Go to services" />
			</a>
			<a href="/portfolio" class="hero-nav-link">
				Portfolio
				<ArrowButton href="/portfolio" ariaLabel="Go to portfolio" />
			</a>
		</div>
	</div>
</section>

<!-- Services Section -->
<section id="services" class="services section">
	<div class="container">
		<h2 class="section-title">Services</h2>
		<div class="services-grid grid grid-3">
			{#each data.services as service}
				<ServiceCard {service} />
			{/each}
		</div>
	</div>
</section>

<!-- Featured Projects Section -->
<section class="featured-projects section bg-light">
	<div class="container">
		<h2 class="section-title text-center">Featured Projects</h2>
		<div class="featured-cta text-center">
			<a href="/portfolio" class="btn btn-dark">See Our Work</a>
		</div>
		<div class="divider"></div>
		<div class="projects-list">
			{#each data.projects as project}
				<ProjectCard {project} variant="list" />
			{/each}
		</div>
	</div>
</section>

<!-- About Section -->
<section id="about" class="about section">
	<div class="container">
		<h2 class="section-title text-center">{data.homePage?.aboutTitle || 'About Us'}</h2>
		<div class="about-content">
			<div class="about-text">
				<p>
					{data.homePage?.aboutDescription || 'We create immersive digital representations of real-world spaces through LiDAR camera systems, drones, and interactive visualization. Blending technology and design, our work focuses on accuracy, clarity, and realism to help people understand places before they ever visit them. From detailed interior models to large-scale environments, we turn physical spaces into intuitive digital assets that build trust, communicate value, and present environments with confidence.'}
				</p>
			</div>
			<div class="about-image">
				{#if data.homePage?.aboutImage}
					<img src={data.aboutImageUrl} alt="Matterport equipment" />
				{:else}
					<div class="placeholder-about"></div>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- Use Cases Section -->
<section class="use-cases section bg-light">
	<div class="container">
		<div class="use-cases-header text-center">
			<h2 class="section-title">Use Cases</h2>
			<p class="use-cases-subtitle">Where can this technology be used? How does it provide a unique experience separate from traditional media?</p>
		</div>
		<Accordion items={data.useCases} />
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="contact-section section">
	<div class="container">
		<h2 class="section-title text-center">Contact Us</h2>

		<div class="contact-form-wrapper">
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
					<div class="form-row">
						<div class="form-group">
							<label for="firstName">First name <span class="required">*</span></label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								required
							/>
						</div>
						<div class="form-group">
							<label for="lastName">Last name <span class="required">*</span></label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								required
							/>
						</div>
					</div>

					<div class="form-group">
						<label for="email">Email <span class="required">*</span></label>
						<input
							type="email"
							id="email"
							name="email"
							required
						/>
					</div>

					<div class="form-group">
						<label for="phone">Phone <span class="required">*</span></label>
						<input
							type="tel"
							id="phone"
							name="phone"
							required
						/>
					</div>

					<div class="form-group">
						<label for="message">Message <span class="required">*</span></label>
						<textarea
							id="message"
							name="message"
							rows="5"
							required
							placeholder="Tell us about your project"
						></textarea>
					</div>

					{#if form?.error}
						<p class="error-message">{form.error}</p>
					{/if}

					<button type="submit" class="btn btn-primary btn-full" disabled={submitting}>
						{submitting ? 'Sending...' : 'Submit'}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	/* Hero Section */
	.hero {
		padding: var(--spacing-lg) 0;
	}

	.hero-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-lg);
		align-items: center;
		margin-bottom: var(--spacing-lg);
	}

	.hero-title,
	.hero-subtitle {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-style: italic;
		line-height: 1.1;
		margin: 0;
	}

	.hero-subtitle {
		margin-bottom: var(--spacing-md);
	}

	.hero-description {
		color: var(--color-text-light);
		font-size: 1rem;
		line-height: 1.7;
		margin-bottom: var(--spacing-md);
		max-width: 550px;
	}

	.hero-image {
		position: relative;
	}

	.hero-image img {
		width: 100%;
		height: auto;
		border-radius: 8px;
	}

	.placeholder-hero {
		aspect-ratio: 4/3;
		background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
		border-radius: 8px;
	}

	.hero-nav {
		display: flex;
		gap: var(--spacing-lg);
		padding-top: var(--spacing-md);
		border-top: 1px solid var(--color-border);
	}

	.hero-nav-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.9rem;
		color: var(--color-text);
		text-decoration: none;
	}

	/* Services Section */
	.services {
		background-color: var(--color-background);
	}

	.section-title {
		margin-bottom: var(--spacing-lg);
	}

	/* Featured Projects Section */
	.featured-cta {
		margin-bottom: var(--spacing-md);
	}

	.projects-list {
		margin-top: var(--spacing-md);
	}

	/* About Section */
	.about-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-lg);
		align-items: center;
	}

	.about-text p {
		font-size: 1rem;
		line-height: 1.8;
		color: var(--color-text-light);
	}

	.about-image img {
		width: 100%;
		height: auto;
		border-radius: 8px;
	}

	.placeholder-about {
		aspect-ratio: 4/3;
		background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%);
		border-radius: 8px;
	}

	/* Use Cases Section */
	.use-cases-header {
		margin-bottom: var(--spacing-lg);
	}

	.use-cases-subtitle {
		color: var(--color-text-light);
		font-size: 1rem;
		max-width: 600px;
		margin: 0 auto;
	}

	/* Contact Section */
	.contact-section {
		background-color: var(--color-background);
	}

	.contact-form-wrapper {
		max-width: 800px;
		margin: 0 auto;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.required {
		color: var(--color-text);
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 0.875rem 1rem;
		font-size: 1rem;
		font-family: var(--font-sans);
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background-color: white;
		transition: border-color var(--transition-fast);
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.form-group textarea {
		resize: vertical;
		min-height: 120px;
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

	/* Responsive */
	@media (max-width: 1024px) {
		.hero-content {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.hero-text {
			order: 1;
		}

		.hero-image {
			order: 2;
		}
	}

	@media (max-width: 768px) {
		.hero-nav {
			flex-direction: column;
			gap: var(--spacing-sm);
		}

		.about-content {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.form-row {
			grid-template-columns: 1fr;
			gap: 0;
		}
	}
</style>
