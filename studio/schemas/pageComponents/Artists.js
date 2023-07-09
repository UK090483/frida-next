export default {
  title: 'Artists',
  name: 'artists',
  type: 'object',
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Carousel', value: 'carousel' },
          { title: 'Masonry', value: 'masonry' }
        ],
        layout: 'radio'
      },
      initialValue: 'carousel'
    },
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'label', type: 'string', title: 'Label' },
    { name: 'label_en', type: 'string', title: 'Label En' },
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Grey', value: 'grey' }
        ]
      },
      initialValue: 'white'
    },

    {
      name: 'filter',
      type: 'array',
      of: [
        {
          name: 'artistFilter',
          type: 'reference',
          to: {
            type: 'artist'
          }
        },
        {
          name: 'mediumFilter',
          type: 'reference',
          to: {
            type: 'medium'
          }
        },
        {
          name: 'stilFilter',
          type: 'reference',
          to: {
            type: 'stil'
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      type: 'type',
      name: 'name'
    },
    prepare({ type, name }) {
      return {
        title: `Artists ${type}`,
        subtitle: name
      }
    }
  }
}
