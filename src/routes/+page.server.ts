import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { client, urlFor } from '$lib/sanity/client';
import { homePageQuery, servicesQuery, projectsQuery } from '$lib/sanity/queries';
import type { HomePage, Service, Project, UseCase } from '$lib/types';

// Default data when Sanity is not configured
const defaultServices: Service[] = [
	{
		_id: '1',
		title: 'Virtual Tours',
		description: 'Immersive virtual tours allow people to explore your space as if they were physically there. Viewers can move freely through the environment, understand layout and scale instantly, and gain confidence before ever visiting in person.',
		image: null as any,
		slug: { current: 'virtual-tours' }
	},
	{
		_id: '2',
		title: 'Aerial Mapping',
		description: 'Aerial mapping transforms large properties into clear, interactive visual assets. By capturing your venue from above, it reveals scale, flow, and surroundings in a way traditional photography cannot.',
		image: null as any,
		slug: { current: 'aerial-mapping' }
	},
	{
		_id: '3',
		title: '3D Modeling',
		description: '3D models convert real-world spaces into precise digital assets that can be viewed, shared, and analyzed. They provide accurate geometry, proportions, and spatial relationships.',
		image: null as any,
		slug: { current: '3d-modeling' }
	}
];

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
	}
];

const defaultUseCases: UseCase[] = [
	{
		title: 'Digital Property Archives & Forensic Loss Documentation',
		description: 'We create a high-precision, tamper-proof digital baseline of your property to streamline the recovery process in the event of a loss. By combining LiDAR-accurate interiors with high-resolution aerial envelope scans, we provide adjusters and restoration teams with an irrefutable "single source of truth" that accelerates claim approvals and eliminates measurement disputes.'
	},
	{
		title: 'Commercial Logistics & Operational Site Planning',
		description: 'We deliver centimeter-accurate interior models and aerial layouts to optimize facility flow and equipment placement. This eliminates planning errors and reduces on-site coordination meetings by allowing your team to design and verify logistics in a dimensionally accurate virtual workspace.'
	},
	{
		title: 'Safety & EHS Digital Twins for Workforce Readiness',
		description: 'To mitigate risk, our hazard-tagged virtual environments allow personnel to undergo safety induction and emergency response training before stepping on-site. This reduces workplace accidents and lowers insurance liability by ensuring your workforce is fully acclimated to high-risk zones in a zero-risk setting.'
	},
	{
		title: 'Geospatial Site Intelligence & Aerial Topographic Mapping',
		description: 'Using advanced drone photogrammetry, we generate precise topographic maps and volumetric data for rapid geospatial intelligence. This allows for faster analysis and feasibility studies while bypassing the long lead times of traditional surveying methods.'
	},
	{
		title: 'Venue Marketing & Pre-Event Visualization',
		description: 'These immersive 3D tours serve as technical planning tools that allow organizers to visualize layouts with absolute dimensional certainty. By providing the data needed to book and plan events without repeated site visits, you can shorten sales cycles and minimize logistical friction.'
	}
];

export const load: PageServerLoad = async () => {
	try {
		const [homePage, services, projects] = await Promise.all([
			client.fetch<HomePage>(homePageQuery),
			client.fetch<Service[]>(servicesQuery),
			client.fetch<Project[]>(projectsQuery)
		]);

		return {
			homePage,
			heroImageUrl: homePage?.heroImage ? urlFor(homePage.heroImage).width(800).url() : null,
			aboutImageUrl: homePage?.aboutImage ? urlFor(homePage.aboutImage).width(800).url() : null,
			services: services?.length ? services : defaultServices,
			projects: projects?.filter(p => p.featured)?.length ? projects.filter(p => p.featured) : defaultProjects,
			useCases: homePage?.useCases?.length ? homePage.useCases : defaultUseCases
		};
	} catch (error) {
		// Return default data if Sanity is not configured
		console.log('Using default data - Sanity not configured');
		return {
			homePage: null,
			heroImageUrl: null,
			aboutImageUrl: null,
			services: defaultServices,
			projects: defaultProjects,
			useCases: defaultUseCases
		};
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName')?.toString();
		const lastName = formData.get('lastName')?.toString();
		const email = formData.get('email')?.toString();
		const phone = formData.get('phone')?.toString();
		const message = formData.get('message')?.toString();

		// Basic validation
		if (!firstName || !lastName || !email || !phone || !message) {
			return fail(400, {
				error: 'Please fill in all required fields.',
				success: false
			});
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				error: 'Please enter a valid email address.',
				success: false
			});
		}

		// Log the submission (in production, integrate with email service or CRM)
		console.log('Contact form submission:', {
			firstName,
			lastName,
			email,
			phone,
			message,
			timestamp: new Date().toISOString()
		});

		return {
			success: true
		};
	}
};
