export default {
  name: 'postCategory',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'name_en',
      type: 'string',
      title: 'Title EN',
      validation: Rule => Rule.required()
    }
  ]
}
