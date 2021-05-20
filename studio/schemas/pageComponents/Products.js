export default {
  title: 'Products',
  name: 'products',
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
    }
  ]
}
