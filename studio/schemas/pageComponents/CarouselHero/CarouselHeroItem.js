export default {
  name: 'carouselHeroItem',
  type: 'object',
  title: 'Carousel Hero Item',
  fields: [
    {
      name: 'content',
      type: 'defaultRichText',
      title: 'Page sections',
      description: 'Add, edit, and reorder sections'
    },

    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Pink', value: 'pink' },
          { title: 'Rot', value: 'red' }
        ],
        layout: 'radio'
      }
    },
    {
      title: 'Image',
      name: 'image',
      type: 'figure'
    }
  ]
}
