export default {
  title: 'InnerSection',
  name: 'innerSection',
  type: 'object',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'items', type: 'array', of: [{ type: 'innerSectionItem' }] },
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
    }
  ]
}
