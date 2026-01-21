import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	fields: [
		defineField({
			name: 'siteName',
			title: 'Site Name',
			type: 'string',
			initialValue: 'Elias Immersive'
		}),
		defineField({
			name: 'logo',
			title: 'Logo',
			type: 'image',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'contactEmail',
			title: 'Contact Email',
			type: 'string'
		}),
		defineField({
			name: 'contactPhone',
			title: 'Contact Phone',
			type: 'string'
		}),
		defineField({
			name: 'address',
			title: 'Address',
			type: 'text'
		}),
		defineField({
			name: 'socialLinks',
			title: 'Social Links',
			type: 'object',
			fields: [
				{ name: 'instagram', title: 'Instagram URL', type: 'url' },
				{ name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
				{ name: 'facebook', title: 'Facebook URL', type: 'url' }
			]
		})
	],
	preview: {
		prepare() {
			return {
				title: 'Site Settings'
			};
		}
	}
});
