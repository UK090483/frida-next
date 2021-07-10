import { ImageMetaResult, imageMeta } from '@lib/queries/snippets'
export const postCardQuery = `
'slug':slug.current,
title,
title_en,
excerpt,
excerpt_en,
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
  title_en: string | null
  excerpt: string | null
  excerpt_en: string | null
  headerImage: ImageMetaResult
  previewImage: ImageMetaResult | null
  releaseDate: string | null
  categories: null | string[]
  categories_en: null | string[]
  createdAt: null | string
}
