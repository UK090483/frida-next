export default {
  title: 'Artists',
  name: 'artists',
  type: 'object',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },

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
  ]
}
