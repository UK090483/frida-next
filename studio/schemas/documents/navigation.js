export default {
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
   __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'item',
      type: 'array',
      title: 'Main Navigation',
      of: [{ type: 'navigationItem' }]
    },
    {
      name: 'footerNav',
      type: 'array',
      title: 'Footer Navigation',
      of: [{ type: 'navigationItem' }]
    },
  
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation'
      }
    }
  }
}
