import { layoutQuery } from 'pageBuilder/Layout/layoutQuery'
import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'
import { imageMeta, ImageMetaResult } from 'pageBuilder/queries/snippets'
import { buildSeoQuery } from 'pageBuilder/Seo/seoQuery'

export const exhibitionSingleQuery = (locale: string) => `
...,
'title': coalesce(title_${locale},title),
'slug':slug.current,
'excerpt': coalesce(excerpt_${locale},excerpt),
'headerImage': headerImage {${imageMeta}},
'previewImage':previewImage {${imageMeta}},
${body(locale)}
${layoutQuery(locale)},
${buildSeoQuery()}
`

export type ExhibitionPageResult = {
  slug: string
  title: string
  excerpt: string | null
  headerImage: ImageMetaResult
  previewImage: ImageMetaResult | null
  content: null | PageBodyResult
  default_header?: null | boolean
}
