<script lang="ts">
	import type { Project } from '$lib/types';
	import { urlFor } from '$lib/sanity/client';
	import ArrowButton from './ArrowButton.svelte';

	interface Props {
		project: Project;
		variant?: 'grid' | 'list';
	}

	let { project, variant = 'list' }: Props = $props();
</script>

{#if variant === 'list'}
	<article class="project-card-list">
		<div class="thumbnail">
			{#if project.image}
				<img
					src={urlFor(project.image).width(160).height(160).url()}
					alt={project.title}
					loading="lazy"
				/>
			{:else}
				<div class="placeholder"></div>
			{/if}
		</div>
		<div class="content">
			<h3>{project.title}</h3>
			<p>{project.description}</p>
		</div>
		<span class="category">{project.category}</span>
		<ArrowButton href="/portfolio/{project.slug?.current}" ariaLabel="View {project.title}" />
	</article>
{:else}
	<article class="project-card-grid">
		<a href="/portfolio/{project.slug?.current}" class="card-link">
			<div class="image-container">
				{#if project.image}
					<img
						src={urlFor(project.image).width(600).height(400).url()}
						alt={project.title}
						loading="lazy"
					/>
				{:else}
					<div class="placeholder"></div>
				{/if}
			</div>
			<div class="card-content">
				<span class="category">{project.category}</span>
				<h3>{project.title}</h3>
				<p>{project.description}</p>
			</div>
		</a>
	</article>
{/if}

<style>
	/* List variant styles */
	.project-card-list {
		display: grid;
		grid-template-columns: auto 1fr auto auto;
		gap: 2rem;
		align-items: center;
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	.project-card-list .thumbnail {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		overflow: hidden;
		flex-shrink: 0;
	}

	.project-card-list .thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.project-card-list .content {
		min-width: 0;
	}

	.project-card-list h3 {
		font-size: 1.125rem;
		font-weight: 500;
		font-family: var(--font-sans);
		margin-bottom: 0.5rem;
	}

	.project-card-list p {
		font-size: 0.875rem;
		color: var(--color-text-light);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.project-card-list .category {
		font-size: 0.875rem;
		color: var(--color-text-light);
		white-space: nowrap;
	}

	/* Grid variant styles */
	.project-card-grid {
		border-radius: 8px;
		overflow: hidden;
		background: var(--color-background-light);
		transition: transform var(--transition-normal), box-shadow var(--transition-normal);
	}

	.project-card-grid:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
	}

	.card-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.image-container {
		aspect-ratio: 4 / 3;
		overflow: hidden;
		background-color: #1a1a1a;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-normal);
	}

	.project-card-grid:hover .image-container img {
		transform: scale(1.05);
	}

	.card-content {
		padding: 1.5rem;
	}

	.project-card-grid .category {
		font-size: 0.75rem;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.5rem;
		display: block;
	}

	.project-card-grid h3 {
		font-size: 1.125rem;
		font-weight: 500;
		font-family: var(--font-sans);
		margin-bottom: 0.5rem;
	}

	.project-card-grid p {
		font-size: 0.875rem;
		color: var(--color-text-light);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.placeholder {
		width: 100%;
		height: 100%;
		background-color: #333;
	}

	@media (max-width: 768px) {
		.project-card-list {
			grid-template-columns: auto 1fr auto;
			grid-template-rows: auto auto;
			gap: 1rem;
		}

		.project-card-list .category {
			grid-column: 2;
			grid-row: 2;
		}

		.project-card-list :global(.arrow-btn) {
			grid-column: 3;
			grid-row: 1 / 3;
		}
	}
</style>
