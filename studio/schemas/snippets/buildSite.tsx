import { defaultBockContent } from '../snippets'
import pageBase from './pageBase'

type buildSiteProps = {
  name: string
  title: string
  content?: any[]
  page?: any[]
}

export default ({ name, title, content = [], page = [] }: buildSiteProps) => ({
  type: 'document',
  name,
  title,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true
    },
    {
      name: 'page',
      title: 'Page'
    },
    {
      name: 'seo',
      title: 'Seo'
    }
  ],
  fields: [
    ...pageBase({ group: 'page' }),

    ...page.map(i => ({ ...i, group: 'page' })),
    {
      name: 'default_header',
      type: 'boolean',
      title: 'Use default Header',
      group: 'page'
    },
    { ...defaultBockContent, group: 'content' },
    // {
    //   name: 'content',
    //   type: 'array',
    //   title: 'Page sections',
    //   description: 'Add, edit, and reorder sections',
    //   of: [
    //     { type: 'categories' },
    //     { type: 'carouselHero' },
    //     { type: 'section' },
    //     { type: 'artworks' },
    //     { type: 'supporter' },
    //     { type: 'artists' }
    //   ],
    //   group: 'content'
    // },
    ...content.map(i => ({ ...i, group: 'content' })),

    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo',
      group: 'seo'
    }
  ],
  preview: {
    select: {
      title: 'slug.current',
      subtitle: 'title'
    }
  }
})
// export default ({ name, title, content = [] }: buildSiteProps) => ({
//   type: title,
//   name: name,
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
//     ...content,
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
// })
