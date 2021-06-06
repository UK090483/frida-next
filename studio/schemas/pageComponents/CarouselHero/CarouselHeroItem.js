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
      name: 'content_en',
      type: 'defaultRichText',
      title: 'Page sections En',
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
          { title: 'Red', value: 'red' },
          { title: 'Grey', value: 'grey' },
          { title: 'Black', value: 'black' }
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
