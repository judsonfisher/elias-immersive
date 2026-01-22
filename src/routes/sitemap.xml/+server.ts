import type { RequestHandler } from './$types';
import { client } from '$lib/sanity/client';

const SITE_URL = 'https://eliasimmersive.com';

// Static pages that always exist
const staticPages = [
	{ path: '', priority: '1.0', changefreq: 'weekly' },
	{ path: '/portfolio', priority: '0.8', changefreq: 'weekly' },
	{ path: '/contact', priority: '0.7', changefreq: 'monthly' },
	{ path: '/home-documentation', priority: '0.9', changefreq: 'monthly' }
];

export const GET: RequestHandler = async () => {
	// Fetch dynamic content from Sanity
	let projects: Array<{ slug: { current: string }; _updatedAt?: string }> = [];
	let landingPages: Array<{ slug: { current: string }; _updatedAt?: string }> = [];

	try {
		[projects, landingPages] = await Promise.all([
			client.fetch(`*[_type == "project"]{ slug, _updatedAt }`),
			client.fetch(`*[_type == "landingPage"]{ slug, _updatedAt }`)
		]);
	} catch (error) {
		console.log('Sitemap: Could not fetch from Sanity, using static pages only');
	}

	const today = new Date().toISOString().split('T')[0];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
	.map(
		(page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
${projects
	.map(
		(project) => `  <url>
    <loc>${SITE_URL}/portfolio/${project.slug?.current}</loc>
    <lastmod>${project._updatedAt?.split('T')[0] || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
	)
	.join('\n')}
${landingPages
	.filter((page) => page.slug?.current !== 'home-documentation') // Already in static pages
	.map(
		(page) => `  <url>
    <loc>${SITE_URL}/${page.slug?.current}</loc>
    <lastmod>${page._updatedAt?.split('T')[0] || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
