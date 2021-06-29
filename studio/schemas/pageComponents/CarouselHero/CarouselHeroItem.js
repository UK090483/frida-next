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
      },
      initialValue:'white'
    },
    {
      title: 'Image',
      name: 'image',
      type: 'figure'
    }
  ],
  preview: {
    select: {
      image: 'image',
      content: 'content',
      bgColor:'bgColor'
     
    },
    prepare({ image ,content,bgColor }) {
     

      const block = (content || []).find(block => block._type === 'block')

      return {
        
        subtitle: bgColor,
        title: block
          ? block.children
              .filter(child => child._type === 'span')
              .map(span => span.text)
              .join('')
          : 'No title',
        media: image
      }
    }
  }
}
