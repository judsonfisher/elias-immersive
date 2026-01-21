import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'service',
	title: 'Services',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Short Description',
			type: 'text',
			rows: 3,
			description: 'Brief description shown on the homepage'
		}),
		defineField({
			name: 'fullDescription',
			title: 'Full Description',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'Detailed description for the service page'
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'orderRank',
			title: 'Order',
			type: 'number',
			description: 'Used to sort services (lower numbers appear first)'
		})
	],
	orderings: [
		{
			title: 'Order',
			name: 'orderRank',
			by: [{ field: 'orderRank', direction: 'asc' }]
		}
	],
	preview: {
		select: {
			title: 'title',
			media: 'image'
		}
	}
});
