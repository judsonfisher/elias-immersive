<script lang="ts">
	import { urlFor } from '$lib/sanity/client';
	import { SEO } from '$lib/components';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let project = $derived(data.project);

	let projectImageUrl = $derived(
		project?.image ? urlFor(project.image).width(1200).height(630).url() : undefined
	);
</script>

<SEO
	title={`${project?.title || 'Project'} | Elias Immersive`}
	description={project?.description || 'View this project from Elias Immersive.'}
	image={projectImageUrl}
	type="article"
/>

<svelte:head>
	<title>{project?.title || 'Project'} | Elias Immersive</title>
</svelte:head>

{#if project}
	<article class="project-detail">
		<!-- Hero Section with Title and Image -->
		<section class="project-hero">
			<div class="container">
				<div class="hero-grid">
					<div class="hero-content">
						<h1>{project.title}</h1>
						<p class="description">{project.description}</p>
						<span class="category-tag">{project.category}</span>
						<a href="/contact" class="btn btn-primary">Contact</a>
					</div>
					<div class="hero-image">
						{#if project.image}
							<img
								src={urlFor(project.image).width(800).height(600).url()}
								alt={project.title}
							/>
						{:else}
							<div class="placeholder-image"></div>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<!-- View Project Section -->
		{#if project.embedUrl}
			<section class="view-project-section">
				<div class="container">
					<div class="divider"></div>
					<h2>View Project</h2>
					<a href={project.embedUrl} target="_blank" rel="noopener noreferrer" class="project-link">
						{project.embedUrl}
					</a>
				</div>
			</section>
		{/if}

		<!-- Gallery Section -->
		{#if project.gallery && project.gallery.length > 0}
			<section class="project-gallery section">
				<div class="container">
					<div class="gallery-grid">
						{#each project.gallery as image, index}
							<div class="gallery-item">
								<img
									src={urlFor(image).width(600).height(400).url()}
									alt="{project.title} - Image {index + 1}"
									loading="lazy"
								/>
							</div>
						{/each}
					</div>
				</div>
			</section>
		{/if}
	</article>
{:else}
	<section class="not-found section">
		<div class="container text-center">
			<h1>Project Not Found</h1>
			<p>The project you're looking for doesn't exist.</p>
			<a href="/portfolio" class="btn btn-primary">View All Projects</a>
		</div>
	</section>
{/if}

<style>
	.project-hero {
		padding: var(--spacing-lg) 0;
		background-color: var(--color-background);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-lg);
		align-items: start;
	}

	.hero-content {
		padding-top: var(--spacing-md);
	}

	h1 {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-style: italic;
		line-height: 1.1;
		margin-bottom: var(--spacing-md);
	}

	.description {
		font-size: 1rem;
		color: var(--color-text-light);
		line-height: 1.7;
		margin-bottom: var(--spacing-md);
		max-width: 500px;
	}

	.category-tag {
		display: block;
		font-size: 0.9rem;
		color: var(--color-text-light);
		margin-bottom: var(--spacing-md);
	}

	.hero-image {
		border-radius: 8px;
		overflow: hidden;
	}

	.hero-image img {
		width: 100%;
		height: auto;
		display: block;
	}

	.placeholder-image {
		aspect-ratio: 4/3;
		background: linear-gradient(135deg, #e0e0dc 0%, #d0d0cc 100%);
	}

	/* View Project Section */
	.view-project-section {
		padding: var(--spacing-md) 0 var(--spacing-lg);
		background-color: var(--color-background);
	}

	.view-project-section .divider {
		width: 100%;
		height: 1px;
		background-color: var(--color-border);
		margin-bottom: var(--spacing-md);
	}

	.view-project-section h2 {
		font-family: var(--font-sans);
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: 0.75rem;
	}

	.project-link {
		font-size: 0.9rem;
		color: var(--color-text);
		text-decoration: underline;
		text-underline-offset: 2px;
		transition: color var(--transition-fast);
	}

	.project-link:hover {
		color: var(--color-primary);
	}

	/* Gallery Section */
	.project-gallery {
		background-color: var(--color-background);
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--spacing-md);
	}

	.gallery-item {
		border-radius: 8px;
		overflow: hidden;
	}

	.gallery-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-normal);
	}

	.gallery-item:hover img {
		transform: scale(1.05);
	}

	/* Not Found */
	.not-found h1 {
		margin-bottom: var(--spacing-sm);
	}

	.not-found p {
		color: var(--color-text-light);
		margin-bottom: var(--spacing-md);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.hero-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.hero-content {
			order: 1;
			padding-top: 0;
		}

		.hero-image {
			order: 2;
		}
	}
</style>
