export default {
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'item',
      type: 'array',
      title: 'Navigation Items',
      of: [{ type: 'navigationItem' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation'
      }
    }
  }
}
