<script lang="ts">
	interface Props {
		href?: string;
		onclick?: () => void;
		ariaLabel?: string;
	}

	let { href, onclick, ariaLabel = 'Navigate' }: Props = $props();
</script>

{#if href}
	<a {href} class="arrow-btn" aria-label={ariaLabel}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<line x1="5" y1="12" x2="19" y2="12"></line>
			<polyline points="12 5 19 12 12 19"></polyline>
		</svg>
	</a>
{:else}
	<button class="arrow-btn" {onclick} aria-label={ariaLabel}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<line x1="5" y1="12" x2="19" y2="12"></line>
			<polyline points="12 5 19 12 12 19"></polyline>
		</svg>
	</button>
{/if}

<style>
	.arrow-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border: 1px solid var(--color-text);
		border-radius: 50%;
		background: transparent;
		cursor: pointer;
		transition: all var(--transition-normal);
		color: var(--color-text);
		text-decoration: none;
	}

	.arrow-btn:hover {
		background-color: var(--color-text);
		color: white;
	}

	.arrow-btn svg {
		width: 1.25rem;
		height: 1.25rem;
	}
</style>
