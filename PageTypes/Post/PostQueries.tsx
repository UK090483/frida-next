import { ImageMetaResult, imageMeta } from '@lib/queries/snippets'
export const postCardQuery = (locale = '') => `
'slug':slug.current,
'title': coalesce(title_${locale},title),
'excerpt': coalesce(excerpt_${locale},excerpt),
releaseDate,
'createdAt':_createdAt,
'categories':categories[]->title,
'categories_en':categories[]->title_en,
'headerImage': headerImage {${imageMeta}},
'previewImage':previewImage {${imageMeta}},
`
export type PostCardResult = {
  slug: string
  title: string
  excerpt: string | null
  headerImage: ImageMetaResult
  previewImage: ImageMetaResult | null
  releaseDate: string | null
  categories: null | string[]
  categories_en: null | string[]
  createdAt: null | string
}
