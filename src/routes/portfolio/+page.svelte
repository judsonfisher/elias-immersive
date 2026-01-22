<script lang="ts">
	import { ProjectCard, SEO } from '$lib/components';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let activeFilter = $state('all');

	const categories = ['all', 'Virtual Tour', 'Aerial Mapping', '3D Model', 'Photogrammetry'];

	let filteredProjects = $derived(
		activeFilter === 'all'
			? data.projects
			: data.projects.filter(p => p.category?.includes(activeFilter))
	);
</script>

<SEO
	title="Portfolio | Elias Immersive"
	description="Explore our portfolio of virtual tours, aerial mapping, and 3D modeling projects in Park City and Utah."
/>

<svelte:head>
	<title>Portfolio | Elias Immersive</title>
</svelte:head>

<section class="portfolio-hero">
	<div class="container">
		<h1>Our Projects</h1>
		<p>Explore our portfolio of immersive digital experiences, from virtual tours to precision 3D models.</p>
	</div>
</section>

<section class="portfolio-content section">
	<div class="container">
		<div class="filters">
			{#each categories as category}
				<button
					class="filter-btn"
					class:active={activeFilter === category}
					onclick={() => activeFilter = category}
				>
					{category === 'all' ? 'All Projects' : category}
				</button>
			{/each}
		</div>

		<div class="projects-grid grid grid-3">
			{#each filteredProjects as project (project._id)}
				<ProjectCard {project} variant="grid" />
			{/each}
		</div>

		{#if filteredProjects.length === 0}
			<p class="no-results">No projects found in this category.</p>
		{/if}
	</div>
</section>

<style>
	.portfolio-hero {
		padding: var(--spacing-xl) 0 var(--spacing-lg);
		text-align: center;
		background-color: var(--color-background);
	}

	.portfolio-hero h1 {
		margin-bottom: var(--spacing-sm);
	}

	.portfolio-hero p {
		color: var(--color-text-light);
		font-size: 1.125rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: var(--spacing-lg);
		justify-content: center;
	}

	.filter-btn {
		padding: 0.625rem 1.25rem;
		font-size: 0.875rem;
		background: transparent;
		border: 1px solid var(--color-border);
		border-radius: 50px;
		cursor: pointer;
		transition: all var(--transition-fast);
		font-family: var(--font-sans);
	}

	.filter-btn:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	.filter-btn.active {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}

	.projects-grid {
		gap: var(--spacing-md);
	}

	.no-results {
		text-align: center;
		color: var(--color-text-light);
		padding: var(--spacing-lg) 0;
	}
</style>
