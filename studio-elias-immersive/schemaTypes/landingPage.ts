import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'landingPage',
	title: 'Landing Pages',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Internal Title',
			type: 'string',
			description: 'Internal name for this landing page (not shown on site)',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'URL Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'seo',
			title: 'SEO',
			type: 'object',
			fields: [
				{ name: 'metaTitle', title: 'Meta Title', type: 'string' },
				{ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 }
			]
		}),
		// Hero Section
		defineField({
			name: 'heroEyebrow',
			title: 'Hero Eyebrow Text',
			type: 'string',
			description: 'Small text above the headline'
		}),
		defineField({
			name: 'heroHeadline',
			title: 'Hero Headline',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'heroSubheadline',
			title: 'Hero Subheadline',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'heroSolution',
			title: 'Hero Solution Text',
			type: 'text',
			rows: 3,
			description: 'The "better way" solution statement'
		}),
		defineField({
			name: 'heroCta',
			title: 'Hero CTA Text',
			type: 'string',
			initialValue: 'Book a Free Consultation'
		}),
		// Problem Section
		defineField({
			name: 'problemTitle',
			title: 'Problem Section Title',
			type: 'string',
			initialValue: 'The Problem With Memory'
		}),
		defineField({
			name: 'problemStats',
			title: 'Problem Statistics',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'stat', title: 'Statistic', type: 'string' },
						{ name: 'description', title: 'Description', type: 'string' }
					]
				}
			]
		}),
		defineField({
			name: 'problemSummary',
			title: 'Problem Summary',
			type: 'text',
			rows: 2
		}),
		// Solution Section
		defineField({
			name: 'solutionTitle',
			title: 'Solution Section Title',
			type: 'string',
			initialValue: 'Your Home, Digitally Preserved'
		}),
		defineField({
			name: 'solutionDescription',
			title: 'Solution Description',
			type: 'text',
			rows: 4
		}),
		defineField({
			name: 'solutionFeatures',
			title: 'Solution Features',
			type: 'array',
			of: [{ type: 'string' }],
			description: 'List of features/benefits'
		}),
		defineField({
			name: 'solutionImage',
			title: 'Solution Image',
			type: 'image',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'solutionImageCaption',
			title: 'Solution Image Caption',
			type: 'string'
		}),
		// Use Cases Section
		defineField({
			name: 'useCasesTitle',
			title: 'Use Cases Section Title',
			type: 'string',
			initialValue: 'More Than Insurance'
		}),
		defineField({
			name: 'useCasesIntro',
			title: 'Use Cases Intro',
			type: 'text',
			rows: 2
		}),
		defineField({
			name: 'useCases',
			title: 'Use Cases',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'title', title: 'Title', type: 'string' },
						{ name: 'description', title: 'Description', type: 'text', rows: 2 }
					]
				}
			]
		}),
		// Process Section
		defineField({
			name: 'processTitle',
			title: 'Process Section Title',
			type: 'string',
			initialValue: 'Simple, Non-Invasive Process'
		}),
		defineField({
			name: 'processSteps',
			title: 'Process Steps',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'title', title: 'Step Title', type: 'string' },
						{ name: 'description', title: 'Step Description', type: 'text', rows: 2 }
					]
				}
			]
		}),
		// Trust Section
		defineField({
			name: 'trustTitle',
			title: 'Trust Section Title',
			type: 'string'
		}),
		defineField({
			name: 'trustContent',
			title: 'Trust Section Content',
			type: 'text',
			rows: 6
		}),
		// CTA Section
		defineField({
			name: 'ctaTitle',
			title: 'CTA Section Title',
			type: 'string',
			initialValue: 'Book Your Free Consultation'
		}),
		defineField({
			name: 'ctaDescription',
			title: 'CTA Description',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'ctaBenefits',
			title: 'CTA Benefits',
			type: 'array',
			of: [{ type: 'string' }]
		})
	],
	preview: {
		select: {
			title: 'title',
			slug: 'slug.current'
		},
		prepare({ title, slug }) {
			return {
				title: title || 'Untitled Landing Page',
				subtitle: slug ? `/${slug}` : 'No slug'
			};
		}
	}
});
