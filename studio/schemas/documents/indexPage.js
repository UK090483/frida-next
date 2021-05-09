export default {
  type: 'document',
  name: 'indexPage',
  title: 'Page',
  __experimental_actions: ['update', /*"create", 'delete', */ 'publish'],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Heads up! This will override the page title.',
      validation: Rule => Rule.max(60).warning('Should be under 60 characters')
    },
    {
      name: 'title_en',
      type: 'string',
      title: 'Title en',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      description: 'Add, edit, and reorder sections',
      of: [
        { type: 'hero' },
        { type: 'categories' },
        { type: 'carouselHero' },
        { type: 'section' },
        { type: 'artworks' },
        { type: 'supporter' }
      ]
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      readOnly: true,
      hidden: true
    }
  ]
}
