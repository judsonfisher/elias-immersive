import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/client';
import { projectBySlugQuery } from '$lib/sanity/queries';
import type { Project } from '$lib/types';

const defaultProjects: Record<string, Project> = {
	'commercial-warehouse': {
		_id: '1',
		title: 'Commercial Warehouse',
		description: 'Precision photogrammetry 3D model of a Utah commercial warehouse facility, delivering accurate spatial documentation for inventory planning, facility management, and architectural reference.',
		fullDescription: 'This project involved creating a comprehensive 3D model of a large commercial warehouse facility using advanced photogrammetry techniques. The resulting model provides centimeter-accurate measurements and can be used for inventory planning, facility management, and architectural documentation.',
		category: 'Photogrammetry, 3D Model',
		image: null as any,
		slug: { current: 'commercial-warehouse' }
	},
	'modern-downtown-loft': {
		_id: '2',
		title: 'Modern Downtown Loft',
		description: 'Immersive Matterport virtual tour of a stylish downtown Denver Airbnb loft, showcasing open-concept living spaces and modern urban design.',
		fullDescription: 'This immersive virtual tour captures every detail of a stylish downtown Denver Airbnb loft. Guests can explore the space remotely, understanding the layout, amenities, and atmosphere before booking.',
		category: 'Virtual Tour',
		image: null as any,
		embedUrl: 'https://my.matterport.com/show/?m=example',
		slug: { current: 'modern-downtown-loft' }
	},
	'lakeshore-vacation-rental': {
		_id: '3',
		title: 'Lakeshore Vacation Rental',
		description: 'Stunning Matterport virtual tour of a lakefront Austin vacation rental, highlighting waterfront views, outdoor spaces, and relaxed Texas Hill Country living.',
		fullDescription: 'This virtual tour showcases a beautiful lakefront vacation rental in Austin, Texas. The tour highlights the waterfront views, spacious outdoor areas, and the relaxed Texas Hill Country atmosphere.',
		category: 'Virtual Tour',
		image: null as any,
		embedUrl: 'https://my.matterport.com/show/?m=example',
		slug: { current: 'lakeshore-vacation-rental' }
	}
};

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	try {
		const project = await client.fetch<Project>(projectBySlugQuery, { slug });

		return {
			project: project || defaultProjects[slug] || null
		};
	} catch (error) {
		console.log('Using default data - Sanity not configured');
		return {
			project: defaultProjects[slug] || null
		};
	}
};
