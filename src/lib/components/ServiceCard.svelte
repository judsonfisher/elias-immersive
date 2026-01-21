<script lang="ts">
	import type { Service } from '$lib/types';
	import { urlFor } from '$lib/sanity/client';
	import ArrowButton from './ArrowButton.svelte';

	interface Props {
		service: Service;
	}

	let { service }: Props = $props();
</script>

<article class="service-card">
	<div class="image-container">
		{#if service.image}
			<img
				src={urlFor(service.image).width(600).height(400).url()}
				alt={service.title}
				loading="lazy"
			/>
		{:else}
			<div class="placeholder-image"></div>
		{/if}
	</div>
	<h3>{service.title}</h3>
	<div class="divider"></div>
	<p>{service.description}</p>
	<ArrowButton href="/portfolio?service={service.slug?.current}" ariaLabel="View {service.title} projects" />
</article>

<style>
	.service-card {
		display: flex;
		flex-direction: column;
	}

	.image-container {
		aspect-ratio: 4 / 3;
		overflow: hidden;
		border-radius: 8px;
		margin-bottom: 1.5rem;
		background-color: #1a1a1a;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-normal);
	}

	.service-card:hover .image-container img {
		transform: scale(1.05);
	}

	.placeholder-image {
		width: 100%;
		height: 100%;
		background-color: #333;
	}

	h3 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.divider {
		width: 100%;
		height: 1px;
		background-color: var(--color-border);
		margin-bottom: 1rem;
	}

	p {
		color: var(--color-text-light);
		font-size: 0.9rem;
		line-height: 1.7;
		flex-grow: 1;
		margin-bottom: 1.5rem;
	}
</style>
