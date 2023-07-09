export default {
  name: 'postCategory',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'title_en',
      type: 'string',
      title: 'Title EN',
      validation: Rule => Rule.required()
    }
  ]
}
