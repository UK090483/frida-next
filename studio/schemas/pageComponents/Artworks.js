export default {
  title: 'Artworks',
  name: 'artworks',
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
    },
    {
      name: 'count',
      type: 'string',
      title: 'Number of Items',
      options: {
        list: [
          { title: 'All (don`t us to often)', value: 'all' },
          { title: '20', value: '20' }
        ],
        layout: 'radio'
      },

      initialValue: '20'
    }
  ]
}
