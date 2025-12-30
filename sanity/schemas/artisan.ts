export default {
  name: 'artisan',
  title: 'Artisan Story',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Artisan Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Nairobi, Kenya',
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'story',
      title: 'Story',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'specialty',
      title: 'Specialty',
      type: 'string',
      description: 'e.g., Traditional Weaving, Natural Dyeing',
    },
    {
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
    },
    {
      name: 'featured',
      title: 'Featured Artisan',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'image',
    },
  },
}
