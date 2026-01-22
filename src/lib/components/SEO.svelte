<script lang="ts">
	import { page } from '$app/stores';

	interface Props {
		title?: string;
		description?: string;
		image?: string;
		type?: 'website' | 'article' | 'product';
		noindex?: boolean;
	}

	let {
		title = 'Elias Immersive | Virtual Tours, Aerial Mapping & 3D Modeling',
		description = 'We create digital representations of physical spaces using advanced imaging technology. Virtual tours, aerial mapping, and 3D modeling services in Park City, Utah.',
		image = 'https://eliasimmersive.com/og-image.jpg',
		type = 'website',
		noindex = false
	}: Props = $props();

	const SITE_URL = 'https://eliasimmersive.com';
	const SITE_NAME = 'Elias Immersive';

	let canonicalUrl = $derived(`${SITE_URL}${$page.url.pathname}`);

	// Local Business structured data
	const localBusinessSchema = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		'@id': `${SITE_URL}/#business`,
		name: SITE_NAME,
		description: 'Professional virtual tours, aerial mapping, and 3D modeling services for residential and commercial properties.',
		url: SITE_URL,
		telephone: '+1-435-555-0100',
		email: 'info@eliasimmersive.com',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Park City',
			addressRegion: 'UT',
			addressCountry: 'US'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 40.6461,
			longitude: -111.498
		},
		areaServed: [
			{
				'@type': 'City',
				name: 'Park City',
				'@id': 'https://www.wikidata.org/wiki/Q488188'
			},
			{
				'@type': 'AdministrativeArea',
				name: 'Summit County',
				'@id': 'https://www.wikidata.org/wiki/Q501094'
			}
		],
		priceRange: '$$$',
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
			opens: '09:00',
			closes: '17:00'
		},
		sameAs: [
			'https://www.instagram.com/eliasimmersive',
			'https://www.linkedin.com/company/eliasimmersive'
		],
		image: image,
		serviceType: [
			'Virtual Tour Photography',
			'Aerial Mapping',
			'3D Modeling',
			'Property Documentation',
			'Matterport Scanning'
		]
	};

	// Website structured data
	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		url: SITE_URL,
		name: SITE_NAME,
		description: description,
		publisher: {
			'@id': `${SITE_URL}/#business`
		}
	};

	// Current page structured data
	const webPageSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${canonicalUrl}/#webpage`,
		url: canonicalUrl,
		name: title,
		description: description,
		isPartOf: {
			'@id': `${SITE_URL}/#website`
		},
		about: {
			'@id': `${SITE_URL}/#business`
		}
	};
</script>

<svelte:head>
	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Robots -->
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(localBusinessSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(webPageSchema)}</script>`}
</svelte:head>
