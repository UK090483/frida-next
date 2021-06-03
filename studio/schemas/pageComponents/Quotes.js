export default {
  title: 'Quotes',
  name: 'quotes',
  type: 'object',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    {
      type: 'array',
      name: 'items',
      title: 'Quote Items',
      of: [
        {
          type: 'reference',
          name: 'items',

          to: [{ type: 'quote' }]
        }
      ]
    }
  ]
}
