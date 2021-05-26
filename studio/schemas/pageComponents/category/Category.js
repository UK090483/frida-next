export default {
  name: 'categories',
  type: 'object',
  title: 'Categories',
  fields: [
    {
      name: 'items',
      type: 'array',
      title: 'Category items',
      description: 'Add, edit, and reorder Items',
      of: [{ type: 'categoryItem' }]
    }
  ],
  preview: {
    select: {
      items: 'items'
    },
    prepare(selection) {
      const { items } = selection
      return {
        title: 'Categories',
        subtitle: `${items ? items.length : '0'} items`
      }
    }
  }
}
