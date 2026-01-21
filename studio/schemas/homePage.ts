import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'homePage',
	title: 'Home Page',
	type: 'document',
	fields: [
		defineField({
			name: 'heroTitle',
			title: 'Hero Title',
			type: 'string',
			initialValue: 'Precision Capture.'
		}),
		defineField({
			name: 'heroSubtitle',
			title: 'Hero Subtitle',
			type: 'string',
			initialValue: 'Interactive Results.'
		}),
		defineField({
			name: 'heroDescription',
			title: 'Hero Description',
			type: 'text',
			rows: 4
		}),
		defineField({
			name: 'heroImage',
			title: 'Hero Image',
			type: 'image',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'services',
			title: 'Featured Services',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'service' }]
				}
			]
		}),
		defineField({
			name: 'featuredProjects',
			title: 'Featured Projects',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'project' }]
				}
			]
		}),
		defineField({
			name: 'aboutTitle',
			title: 'About Section Title',
			type: 'string',
			initialValue: 'About Us'
		}),
		defineField({
			name: 'aboutDescription',
			title: 'About Section Description',
			type: 'text',
			rows: 6
		}),
		defineField({
			name: 'aboutImage',
			title: 'About Section Image',
			type: 'image',
			options: {
				hotspot: true
			}
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
						{ name: 'description', title: 'Description', type: 'text', rows: 4 }
					]
				}
			]
		})
	],
	preview: {
		prepare() {
			return {
				title: 'Home Page'
			};
		}
	}
});
