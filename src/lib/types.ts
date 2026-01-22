import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface Service {
	_id: string;
	title: string;
	description: string;
	fullDescription?: string;
	image: SanityImageSource;
	slug: { current: string };
}

export interface Project {
	_id: string;
	title: string;
	description: string;
	fullDescription?: string;
	category: string;
	image: SanityImageSource;
	gallery?: SanityImageSource[];
	embedUrl?: string;
	slug: { current: string };
	featured?: boolean;
}

export interface UseCase {
	title: string;
	description: string;
}

export interface HomePage {
	heroTitle: string;
	heroSubtitle: string;
	heroDescription: string;
	heroImage: SanityImageSource;
	services: Service[];
	featuredProjects: Project[];
	aboutTitle: string;
	aboutDescription: string;
	aboutImage: SanityImageSource;
	useCases: UseCase[];
}

export interface SiteSettings {
	siteName: string;
	logo: SanityImageSource;
	contactEmail: string;
	contactPhone: string;
	address: string;
	socialLinks: {
		instagram?: string;
		linkedin?: string;
		facebook?: string;
	};
}

export interface LandingPage {
	title: string;
	slug: { current: string };
	seo?: {
		metaTitle?: string;
		metaDescription?: string;
	};
	heroEyebrow?: string;
	heroHeadline: string;
	heroSubheadline?: string;
	heroSolution?: string;
	heroCta?: string;
	problemTitle?: string;
	problemStats?: Array<{
		stat: string;
		description: string;
	}>;
	problemSummary?: string;
	solutionTitle?: string;
	solutionDescription?: string;
	solutionFeatures?: string[];
	solutionImage?: SanityImageSource;
	solutionImageCaption?: string;
	useCasesTitle?: string;
	useCasesIntro?: string;
	useCases?: Array<{
		title: string;
		description: string;
	}>;
	processTitle?: string;
	processSteps?: Array<{
		title: string;
		description: string;
	}>;
	trustTitle?: string;
	trustContent?: string;
	ctaTitle?: string;
	ctaDescription?: string;
	ctaBenefits?: string[];
}
