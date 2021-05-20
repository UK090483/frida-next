import { getSanityClient } from '@lib/sanity'
import { PageBodyResult, body } from './pageBuilderQueries'
import { SiteResult, site } from './pageQueries'
import { imageMeta, ImageMetaResult } from './snippets'

export const postSingleView = `
title,
title_en,
'createdAt':_createdAt,
'categories':categories[]->{title,title_en},
'slug':slug.current,
excerpt,
excerpt_en,
'headerImage': headerImage {${imageMeta}},
'previewImage':previewImage {${imageMeta}},

${body}
${site}
`

export type PostPageResult = {
  slug: string
  title: string
  title_en: string | null
  excerpt: string | null
  excerpt_en: string | null
  categories: null | { title_en: string; title: string }[]
  createdAt: null | string
  headerImage: ImageMetaResult
  previewImage: ImageMetaResult | null
  content: null | PageBodyResult
  site: SiteResult
}

export const getPostPage = async (slug: string, preview: any) => {
  const slugs = [`/${slug}`, slug, `/${slug}/`]

  const query = `
        *[_type == "post" && slug.current in ${JSON.stringify(slugs)}][0]{
          ${postSingleView},
        }
      `
  const data = await getSanityClient(preview).fetch(query)

  return data as PostPageResult | null
}
