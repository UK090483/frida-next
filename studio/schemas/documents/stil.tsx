export default {
  name: 'stil',
  type: 'document',
  title: 'Stil',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'name_en',
      type: 'string',
      title: 'Name En',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
}
