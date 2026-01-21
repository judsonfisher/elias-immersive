import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/client';
import { projectsQuery } from '$lib/sanity/queries';
import type { Project } from '$lib/types';

const defaultProjects: Project[] = [
	{
		_id: '1',
		title: 'Commercial Warehouse',
		description: 'Precision photogrammetry 3D model of a Utah commercial warehouse facility, delivering accurate spatial documentation for inventory planning, facility management, and architectural reference.',
		category: 'Photogrammetry, 3D Model',
		image: null as any,
		slug: { current: 'commercial-warehouse' }
	},
	{
		_id: '2',
		title: 'Modern Downtown Loft',
		description: 'Immersive Matterport virtual tour of a stylish downtown Denver Airbnb loft, showcasing open-concept living spaces and modern urban design.',
		category: 'Virtual Tour',
		image: null as any,
		slug: { current: 'modern-downtown-loft' }
	},
	{
		_id: '3',
		title: 'Lakeshore Vacation Rental',
		description: 'Stunning Matterport virtual tour of a lakefront Austin vacation rental, highlighting waterfront views, outdoor spaces, and relaxed Texas Hill Country living.',
		category: 'Virtual Tour',
		image: null as any,
		slug: { current: 'lakeshore-vacation-rental' }
	},
	{
		_id: '4',
		title: 'Industrial Complex',
		description: 'Comprehensive aerial mapping and 3D documentation of a large industrial complex for facility planning and asset management.',
		category: 'Aerial Mapping',
		image: null as any,
		slug: { current: 'industrial-complex' }
	},
	{
		_id: '5',
		title: 'Historic Property',
		description: 'Detailed virtual tour of a historic property showcasing architectural details and period features for preservation documentation.',
		category: 'Virtual Tour',
		image: null as any,
		slug: { current: 'historic-property' }
	},
	{
		_id: '6',
		title: 'Retail Space',
		description: 'Interactive 3D model of a retail space enabling remote space planning and tenant visualization.',
		category: '3D Model',
		image: null as any,
		slug: { current: 'retail-space' }
	}
];

export const load: PageServerLoad = async () => {
	try {
		const projects = await client.fetch<Project[]>(projectsQuery);

		return {
			projects: projects?.length ? projects : defaultProjects
		};
	} catch (error) {
		console.log('Using default data - Sanity not configured');
		return {
			projects: defaultProjects
		};
	}
};
