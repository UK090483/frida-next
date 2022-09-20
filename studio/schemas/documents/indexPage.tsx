import { defaultBockContent } from '../snippets'
import pageBase from '../snippets/pageBase'
export default {
  type: 'document',
  name: 'indexPage',
  title: 'Page',
  __experimental_actions: ['update' /*"create", 'delete', 'publish' */],
  fields: [
    ...pageBase().filter(i => i.type !== 'slug'),
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
