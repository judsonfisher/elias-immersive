<script lang="ts">
	import type { UseCase } from '$lib/types';

	interface Props {
		items: UseCase[];
	}

	let { items }: Props = $props();
	let openIndex = $state<number | null>(0);

	function toggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<div class="accordion">
	{#each items as item, index}
		<div class="accordion-item" class:open={openIndex === index}>
			<button class="accordion-header" onclick={() => toggle(index)}>
				<span>{item.title}</span>
				<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="6 9 12 15 18 9"></polyline>
				</svg>
			</button>
			{#if openIndex === index}
				<div class="accordion-content">
					<p>{item.description}</p>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.accordion {
		border-top: 1px solid var(--color-border);
	}

	.accordion-item {
		border-bottom: 1px solid var(--color-border);
	}

	.accordion-header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 0;
		background: none;
		border: none;
		cursor: pointer;
		font-family: var(--font-sans);
		font-size: 1rem;
		font-weight: 500;
		text-align: left;
		color: var(--color-text);
		transition: color var(--transition-fast);
	}

	.accordion-header:hover {
		color: var(--color-primary);
	}

	.icon {
		width: 1.25rem;
		height: 1.25rem;
		transition: transform var(--transition-normal);
		flex-shrink: 0;
	}

	.accordion-item.open .icon {
		transform: rotate(180deg);
	}

	.accordion-content {
		padding-bottom: 1.5rem;
	}

	.accordion-content p {
		color: var(--color-text-light);
		line-height: 1.8;
		margin: 0;
		max-width: 900px;
	}
</style>
