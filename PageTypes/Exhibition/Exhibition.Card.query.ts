import { ImageMetaResult, imageMeta } from 'pageBuilder/queries/snippets'
export const ExhibitionCardQuery = (locale: string) => `
'slug':slug.current,
'title': coalesce(title_${locale},title),
'excerpt': coalesce(excerpt_${locale},excerpt),
'image':coalesce(previewImage,headerImage){${imageMeta}},
startDate,
endDate,
`
export type ExhibitionCardResult = {
  slug: string
  title: string
  excerpt: string | null
  image: ImageMetaResult | null
  startDate: string | null
  endDate: string | null
}
