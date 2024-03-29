import { imageMeta, ImageMetaResult } from 'pageBuilder/queries/snippets'
import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'

const categoryItem = (locale: string) => `
...,
'label': coalesce(label_${locale},label),

size,
'internalLink' :internalLink->{"type":_type,'slug':slug.current},
urlParams,
sizeMobile,
'images':images[]{${imageMeta}}
`

export const categoriesBlockQuery = (locale: string) => `
_type == "categories" => {
  _type,
  type,
  'items':items[]{${categoryItem(locale)}},
}
`
type CategoryItem = {
  label?: string
  size?: 'm' | 's' | 'l'
  sizeMobile?: 'm' | 's' | 'l'
  internalLink?: { slug: string; type: string } | null
  urlParams?: string
  images?: ImageMetaResult[]
}
export interface CategoryBlockResult extends PageBuilderBlockBase {
  _type: 'categories'
  items: CategoryItem[]
}
