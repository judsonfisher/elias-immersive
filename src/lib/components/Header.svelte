<script lang="ts">
	import { page } from '$app/stores';

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header class="header">
	<div class="header-container">
		<a href="/" class="logo" onclick={closeMenu}>
			<span class="logo-icon">ei</span>
			<span class="logo-text">Elias Immersive</span>
		</a>

		<nav class="nav-desktop">
			<a href="/#services" class="nav-link">Our Services</a>
			<a href="/portfolio" class="nav-link" class:active={$page.url.pathname === '/portfolio'}>Projects (All)</a>
		</nav>

		<a href="/contact" class="btn btn-outline contact-btn">Contact</a>

		<button class="menu-toggle" onclick={toggleMenu} aria-label="Toggle menu">
			<span class="menu-icon" class:open={menuOpen}></span>
		</button>
	</div>

	{#if menuOpen}
		<nav class="nav-mobile">
			<a href="/#services" class="nav-link" onclick={closeMenu}>Our Services</a>
			<a href="/portfolio" class="nav-link" onclick={closeMenu}>Projects (All)</a>
			<a href="/contact" class="nav-link" onclick={closeMenu}>Contact</a>
		</nav>
	{/if}
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 100;
		background-color: var(--color-background);
		border-bottom: 1px solid var(--color-border);
	}

	.header-container {
		max-width: var(--container-max);
		margin: 0 auto;
		padding: 1rem var(--container-padding);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: var(--color-text);
	}

	.logo-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		background-color: var(--color-primary);
		color: white;
		font-size: 0.75rem;
		font-weight: 600;
		border-radius: 4px;
	}

	.logo-text {
		font-size: 1rem;
		font-weight: 500;
	}

	.nav-desktop {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-link {
		font-size: 0.9rem;
		color: var(--color-text);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--color-primary);
	}

	.contact-btn {
		padding: 0.625rem 1.25rem;
		font-size: 0.875rem;
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
	}

	.menu-icon {
		display: block;
		width: 24px;
		height: 2px;
		background-color: var(--color-text);
		position: relative;
		transition: background-color var(--transition-fast);
	}

	.menu-icon::before,
	.menu-icon::after {
		content: '';
		position: absolute;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: var(--color-text);
		transition: transform var(--transition-normal);
	}

	.menu-icon::before {
		top: -7px;
	}

	.menu-icon::after {
		bottom: -7px;
	}

	.menu-icon.open {
		background-color: transparent;
	}

	.menu-icon.open::before {
		transform: translateY(7px) rotate(45deg);
	}

	.menu-icon.open::after {
		transform: translateY(-7px) rotate(-45deg);
	}

	.nav-mobile {
		display: none;
		flex-direction: column;
		padding: 1rem var(--container-padding) 2rem;
		border-top: 1px solid var(--color-border);
	}

	.nav-mobile .nav-link {
		padding: 1rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	@media (max-width: 768px) {
		.nav-desktop,
		.contact-btn {
			display: none;
		}

		.menu-toggle {
			display: block;
		}

		.nav-mobile {
			display: flex;
		}
	}
</style>
