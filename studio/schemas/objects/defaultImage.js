export default {
  title: 'Image',
  name: 'defaultImage',
  type: 'image',
  options: {
    hotspot: true
  },
  fields: [
    {
      title: 'Alternative text',
      name: 'alt',
      type: 'string',
      description: 'Important for SEO and accessiblity.',
      options: {
        isHighlighted: true
      },
      validation: Rule => {
        return Rule.custom((field, context) =>
          'asset' in context.parent && field === undefined
            ? 'Required! (think about non-visual readers)'
            : true
        )
      }
    },
    {
      title: "Fillmode",
      name: "fill",
      type: "string",
      options: {
        list: [
          { title: "Fill", value: "fill" },
          { title: "Contain", value: "contain" },
        ],
      },
    },
  ],
  preview: {
    select: {
      asset: 'asset',
      alt: 'alt'
    },
    prepare({ alt, asset }) {
      return {
        title: alt || '(alt text missing)',

        media: asset
      }
    }
  }
}
