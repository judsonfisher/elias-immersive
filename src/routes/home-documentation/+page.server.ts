import type { PageServerLoad } from './$types';
import { client, urlFor } from '$lib/sanity/client';
import { landingPageBySlugQuery } from '$lib/sanity/queries';
import type { LandingPage } from '$lib/types';

// Matterport demo embed URL
const MATTERPORT_EMBED_URL = 'https://my.matterport.com/show/?m=o6PVWmeo8Bb';

// Default content for the Home Documentation landing page
const defaultContent: LandingPage = {
	title: 'Home Documentation',
	slug: { current: 'home-documentation' },
	seo: {
		metaTitle: 'Home Documentation & Digital Twins | Elias Immersive',
		metaDescription: 'Protect your home with comprehensive digital documentation. 3D scans and virtual walkthroughs for insurance claims, estate planning, and peace of mind.'
	},
	heroEyebrow: 'Home Documentation for Homeowners',
	heroHeadline: 'Could you prove what\'s in your home if disaster struck?',
	heroSubheadline: 'Most homeowners can\'t. After a fire, flood, or theft, they struggle to remember—let alone prove—what they owned. Insurance claims stall. Settlements shrink. Memories fade.',
	heroSolution: 'There\'s a better way. A complete digital twin of your home captures every room, every detail, every possession—creating an undeniable record that protects what matters most.',
	heroCta: 'Book a Free Consultation',
	problemTitle: 'The Problem With Memory',
	problemStats: [
		{ stat: '73%', description: 'of homeowners underestimate their possessions\' value when filing claims' },
		{ stat: '$50K+', description: 'average underinsurance gap for high-value homes' },
		{ stat: '18 mo', description: 'average time to settle disputed insurance claims' }
	],
	problemSummary: 'When you need to prove what you owned, a spreadsheet won\'t cut it. Neither will a box of receipts you can\'t find. You need visual, undeniable proof.',
	solutionTitle: 'Your Home, Digitally Preserved',
	solutionDescription: 'We create a comprehensive digital twin of your home using professional-grade 3D scanning technology. The result is an interactive virtual walkthrough that captures everything. Your digital twin lives securely in the cloud, accessible anytime from any device. Walk through your home virtually, zoom in on details, and export documentation for insurance, estate planning, or renovation projects.',
	solutionFeatures: [
		'Every room from multiple angles',
		'Architectural details and finishes',
		'Furniture, art, and valuables',
		'Storage areas and closets',
		'Precise measurements and dimensions'
	],
	useCasesTitle: 'More Than Insurance',
	useCasesIntro: 'While insurance documentation is the primary benefit, your digital twin serves many purposes:',
	useCases: [
		{ title: 'Insurance Claims', description: 'File faster, more accurate claims with visual proof of your possessions before loss occurs.' },
		{ title: 'Estate Planning', description: 'Document assets for trusts, wills, and family records. Make inventory clear for future generations.' },
		{ title: 'Renovation Planning', description: 'Share exact measurements and current conditions with contractors and designers remotely.' },
		{ title: 'Property Management', description: 'Track condition over time for second homes, rentals, or properties managed from afar.' }
	],
	processTitle: 'Simple, Non-Invasive Process',
	processSteps: [
		{ title: 'Consultation', description: 'We discuss your home, priorities, and any areas requiring special attention.' },
		{ title: 'Scanning', description: 'Our technician captures your home in 2-4 hours using non-intrusive camera equipment. No mess, no disruption.' },
		{ title: 'Processing', description: 'We create your interactive digital twin, optimized for easy navigation and detail review.' },
		{ title: 'Delivery', description: 'Access your secure digital twin online. Walk through it anytime, share with advisors, export as needed.' }
	],
	trustTitle: 'Built for Homeowners Who Value What They Own',
	trustContent: 'We understand that every home tells a story. From expansive estates to thoughtfully designed family homes, our scanning technology captures the full scope of your investment—including those hard-to-document spaces like wine cellars, storage areas, and architectural details that make your home unique.\n\nYour data stays secure, private, and accessible only to you.',
	ctaTitle: 'Book Your Free Consultation',
	ctaDescription: 'Learn how a digital twin can protect your home and possessions. We\'ll discuss your property, answer questions, and provide a custom quote—no obligation.',
	ctaBenefits: [
		'15-minute introductory call',
		'Custom assessment for your property',
		'Transparent pricing—no hidden fees'
	]
};

export const load: PageServerLoad = async () => {
	try {
		const landingPage = await client.fetch<LandingPage>(landingPageBySlugQuery, { slug: 'home-documentation' });

		if (landingPage) {
			return {
				landingPage,
				solutionImageUrl: landingPage.solutionImage ? urlFor(landingPage.solutionImage).width(800).url() : null,
				matterportEmbedUrl: MATTERPORT_EMBED_URL
			};
		}

		// Return default content if no Sanity document exists
		return {
			landingPage: defaultContent,
			solutionImageUrl: null,
			matterportEmbedUrl: MATTERPORT_EMBED_URL
		};
	} catch (error) {
		console.log('Using default landing page content - Sanity not configured or document not found');
		return {
			landingPage: defaultContent,
			solutionImageUrl: null,
			matterportEmbedUrl: MATTERPORT_EMBED_URL
		};
	}
};
