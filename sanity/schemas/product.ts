export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
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
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'compareAtPrice',
      title: 'Compare at Price',
      type: 'number',
      description: 'Original price if on sale',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'colors',
      title: 'Available Colors',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      fields: [
        {name: 'height', title: 'Height (cm)', type: 'number'},
        {name: 'width', title: 'Width (cm)', type: 'number'},
        {name: 'depth', title: 'Depth (cm)', type: 'number'},
      ],
    },
    {
      name: 'weight',
      title: 'Weight (kg)',
      type: 'number',
    },
    {
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'bestSeller',
      title: 'Best Seller',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'limitedEdition',
      title: 'Limited Edition',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      price: 'price',
    },
    prepare(selection: any) {
      const {title, media, price} = selection
      return {
        title: title,
        subtitle: `€${price}`,
        media: media,
      }
    },
  },
}
