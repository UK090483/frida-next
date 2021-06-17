import { defaultBockContent } from '../snippets'
export default {
  type: 'document',
  name: 'indexPage',
  title: 'Page',
  __experimental_actions: ['update', /*"create", 'delete', 'publish' */ ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',

      validation: Rule =>
        Rule.required()
          .max(20)
          .warning('Should be under 20 characters')
    },
    {
      name: 'title_en',
      type: 'string',
      title: 'Title en',
      validation: Rule =>
        Rule.required()
          .max(20)
          .warning('Should be under 20 characters')
    },
    {
      name: 'pageHeader',
      type: 'pageHeader',
      title: 'Header'
    },
    defaultBockContent,
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
