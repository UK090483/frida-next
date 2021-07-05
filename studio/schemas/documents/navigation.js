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
    },
    {
      name: 'agbSite',
      type: 'reference',
      title: 'Agb Site',
      to: [{ type: 'page' }]
    },
    {
      name: 'imprintSite',
      type: 'reference',
      title: 'Imprint Site',
      to: [{ type: 'page' }]
    },
    // {
    //   name: 'homePage',
    //   type: 'reference',
    //   title: 'HomePage',
    //   to: [{ type: 'page' }],
    //   validation: Rule => Rule.required()
    // }
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation'
      }
    }
  }
}
