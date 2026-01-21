<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="footer-container">
		<div class="footer-main">
			<div class="footer-brand">
				<a href="/" class="logo">
					<span class="logo-icon">ei</span>
					<span class="logo-text">Elias Immersive</span>
				</a>
				<p class="tagline">Precision Capture. Interactive Results.</p>
			</div>

			<nav class="footer-nav">
				<div class="footer-col">
					<h4>Services</h4>
					<a href="/#services">Virtual Tours</a>
					<a href="/#services">Aerial Mapping</a>
					<a href="/#services">3D Modeling</a>
				</div>
				<div class="footer-col">
					<h4>Company</h4>
					<a href="/#about">About</a>
					<a href="/portfolio">Portfolio</a>
					<a href="/contact">Contact</a>
				</div>
			</nav>
		</div>

		<div class="footer-bottom">
			<p>&copy; {currentYear} Elias Immersive. All rights reserved.</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		background-color: var(--color-background-light);
		border-top: 1px solid var(--color-border);
		padding: var(--spacing-lg) 0 var(--spacing-md);
	}

	.footer-container {
		max-width: var(--container-max);
		margin: 0 auto;
		padding: 0 var(--container-padding);
	}

	.footer-main {
		display: flex;
		justify-content: space-between;
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-lg);
	}

	.footer-brand {
		max-width: 300px;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: var(--color-text);
		margin-bottom: 1rem;
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

	.tagline {
		color: var(--color-text-light);
		font-size: 0.9rem;
		margin: 0;
	}

	.footer-nav {
		display: flex;
		gap: var(--spacing-lg);
	}

	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.footer-col h4 {
		font-family: var(--font-sans);
		font-size: 0.875rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.footer-col a {
		font-size: 0.875rem;
		color: var(--color-text-light);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.footer-col a:hover {
		color: var(--color-primary);
	}

	.footer-bottom {
		padding-top: var(--spacing-md);
		border-top: 1px solid var(--color-border);
	}

	.footer-bottom p {
		font-size: 0.875rem;
		color: var(--color-text-light);
		margin: 0;
	}

	@media (max-width: 768px) {
		.footer-main {
			flex-direction: column;
			gap: var(--spacing-md);
		}

		.footer-brand {
			max-width: 100%;
		}

		.footer-nav {
			flex-wrap: wrap;
			gap: var(--spacing-md);
		}

		.footer-col {
			min-width: 140px;
		}
	}
</style>
