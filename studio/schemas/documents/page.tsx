import buildSite from '../snippets/buildSite'

export default buildSite({
  name: 'page',
  title: 'Page',
  page: [
    {
      name: 'footer',
      description: 'if empty it will use the default Footer',
      type: 'reference',
      title: 'Footer',
      to: [{ type: 'footer' }]
    }
  ]
})
// export default {
//   type: 'document',
//   name: 'page',
//   title: 'Page',
//   fields: [
//     ...pageBase(),
//     {
//       name: 'footer',
//       description: 'if empty it will use the default Footer',
//       type: 'reference',
//       title: 'Footer',
//       to: [{ type: 'footer' }]
//     },
//     defaultBockContent,

//     {
//       title: 'SEO / Share Settings',
//       name: 'seo',
//       type: 'seo'
//     }
//   ],
//   preview: {
//     select: {
//       title: 'slug.current',
//       subtitle: 'title'
//     }
//   }
// }
