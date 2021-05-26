export default {
  name: 'categoryItem',
  type: 'object',
  title: 'Category Item',
  fields: [
    {
      name: 'label',
      type: 'string',
      title: 'Label'
    },
    {
      name: 'label_en',
      type: 'string',
      title: 'Label En'
    },

    {
      title: 'Internal link',
      description: 'Use this to link between pages on the website',
      name: 'internalLink',
      type: 'reference',
      to: [
        { type: 'indexPage' },
        { type: 'page' },
        { type: 'artwork' },
        { type: 'artist' }
      ]
    },
    {
      title: 'Link Params',
      name: 'urlParams',
      type: 'string'
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string',
      options: {
        list: [
          { title: 's', value: 's' },
          { title: 'm', value: 'm' },
          { title: 'l', value: 'l' }
        ]
      }
    },
    {
      title: 'Size Mobile',
      name: 'sizeMobile',
      type: 'string',
      options: {
        list: [
          { title: 's', value: 's' },
          { title: 'm', value: 'm' },
          { title: 'l', value: 'l' }
        ]
      }
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }
  ]
}
