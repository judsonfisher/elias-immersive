<script lang="ts">
	import { Header, Footer, SEO } from '$lib/components';
	import '$lib/styles/global.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { inject } from '@vercel/analytics';
	import type { SiteSettings } from '$lib/types';

	injectSpeedInsights();
	inject();

	interface Props {
		children: any;
		data: {
			siteSettings: SiteSettings;
		};
	}

	let { children, data }: Props = $props();
</script>

<!-- Global SEO defaults (pages can override with their own SEO component) -->
<SEO />

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Wix+Madefor+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="app">
	<Header siteSettings={data.siteSettings} />
	<main>
		{@render children()}
	</main>
	<Footer siteSettings={data.siteSettings} />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}
</style>
