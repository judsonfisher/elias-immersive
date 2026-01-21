import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'project',
	title: 'Projects',
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
			description: 'Brief description shown in project listings'
		}),
		defineField({
			name: 'fullDescription',
			title: 'Full Description',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'Detailed description for the project page'
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{ title: 'Virtual Tour', value: 'Virtual Tour' },
					{ title: 'Aerial Mapping', value: 'Aerial Mapping' },
					{ title: '3D Model', value: '3D Model' },
					{ title: 'Photogrammetry', value: 'Photogrammetry' },
					{ title: 'Photogrammetry, 3D Model', value: 'Photogrammetry, 3D Model' }
				]
			}
		}),
		defineField({
			name: 'image',
			title: 'Featured Image',
			type: 'image',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'gallery',
			title: 'Gallery Images',
			type: 'array',
			of: [
				{
					type: 'image',
					options: {
						hotspot: true
					}
				}
			]
		}),
		defineField({
			name: 'embedUrl',
			title: 'Embed URL',
			type: 'url',
			description: 'URL for Matterport tour or 3D model embed'
		}),
		defineField({
			name: 'featured',
			title: 'Featured Project',
			type: 'boolean',
			description: 'Show this project on the homepage',
			initialValue: false
		}),
		defineField({
			name: 'orderRank',
			title: 'Order',
			type: 'number',
			description: 'Used to sort projects (lower numbers appear first)'
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
			category: 'category',
			media: 'image'
		},
		prepare({ title, category, media }) {
			return {
				title,
				subtitle: category,
				media
			};
		}
	}
});
