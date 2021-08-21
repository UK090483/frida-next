export default {
  title: 'Image Gallery',
  name: 'imageGalleryPlug',
  type: 'object',
  options: {
    hotspot: true
  },
  fields: [
    { name: 'name', title: 'title', type: 'string' },
    {
      name: 'items',
      title: 'Images',
      type: 'array',
      of: [{ type: 'defaultImage' }]
    },
    {
      name: 'rows',
      title: 'Rows',
      type: 'number',
      initialValue: 4,
      validation: Rule =>
        Rule.required()
          .integer()
          .min(1)
          .max(8)
    },
    {
      name: 'rows_mobile',
      title: 'Rows Mobile',
      type: 'number',
      initialValue: 2,
      validation: Rule =>
        Rule.required()
          .integer()
          .min(1)
          .max(8)
    },
    {
      name: 'ratio',
      title: 'Ratio',
      type: 'string',
      initialValue: '1:1',
      options: {
        list: ['1:1', '16:9', '2:3', '3:2']
      }
    },
    {
      name: 'galerieType',
      title: 'Galerie Type',
      type: 'string',
      initialValue: '1:1',
      options: {
        list: ['normal', 'carousel']
      }
    }
  ],
  preview: {
    select: {
      name: 'name'
    },
    prepare({ name }) {
      return {
        title: 'ImageGallery: ' + name
      }
    }
  }
}
