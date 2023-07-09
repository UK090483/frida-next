import buildSite from '../snippets/buildSite'

export default buildSite({
  name: 'post',
  title: 'Blog Post',
  content: [
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [
        {
          type: 'reference',
          to: {
            type: 'postCategory'
          }
        }
      ]
    },
    {
      title: 'Release date',
      name: 'releaseDate',
      type: 'date'
    }
  ],
  page: [
    {
      name: 'headerImage',
      type: 'image',
      title: 'Header Image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true
      },
      group: 'page'
    },
    {
      name: 'previewImage',
      type: 'image',
      title: 'Preview Image',
      options: {
        hotspot: true
      },
      group: 'page'
    }
  ]
})

// export default {
//   type: 'document',
//   name: 'post',
//   title: 'Blog Post',
//   groups: [
//     {
//       name: 'content',
//       title: 'Content',
//       default: true
//     },
//     {
//       name: 'page',
//       title: 'Page'
//     },
//     {
//       name: 'seo',
//       title: 'Seo'
//     }
//   ],
//   fields: [
//     ...pageBase({ group: 'page' }),
//     {
//       name: 'headerImage',
//       type: 'image',
//       title: 'Header Image',
//       validation: Rule => Rule.required(),
//       options: {
//         hotspot: true
//       },
//       group: 'page'
//     },
//     {
//       name: 'previewImage',
//       type: 'image',
//       title: 'Preview Image',
//       options: {
//         hotspot: true
//       },
//       group: 'page'
//     },
//     {
//       name: 'categories',
//       type: 'array',
//       title: 'Categories',
//       of: [
//         {
//           type: 'reference',
//           to: {
//             type: 'postCategory'
//           }
//         }
//       ],
//       group: 'content'
//     },
//     {
//       title: 'Release date',
//       name: 'releaseDate',
//       type: 'date',
//       group: 'content'
//     },
//     {
//       name: 'default_header',
//       type: 'boolean',
//       title: 'Use default Header',
//       group: 'page'
//     },
//     {
//       name: 'content',
//       type: 'array',
//       title: 'Page sections',
//       description: 'Add, edit, and reorder sections',
//       of: [
//         { type: 'categories' },
//         { type: 'carouselHero' },
//         { type: 'section' },
//         { type: 'artworks' },
//         { type: 'supporter' },
//         { type: 'artists' }
//       ],
//       group: 'content'
//     },

//     {
//       title: 'SEO / Share Settings',
//       name: 'seo',
//       type: 'seo',
//       group: 'seo'
//     }
//   ],
//   preview: {
//     select: {
//       title: 'slug.current',
//       subtitle: 'title'
//     }
//   }
// }
