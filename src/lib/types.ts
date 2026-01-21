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
