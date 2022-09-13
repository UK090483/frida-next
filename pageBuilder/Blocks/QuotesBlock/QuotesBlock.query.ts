import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'

export const QuoteQuery = (locale: string) => `
  author,
  'subtitle': coalesce(subtitle_${locale},subtitle),
  'quote': coalesce(quote_${locale},quote),
  'link':link->{'slug':slug.current,'type':_type },
  'authorImage':image{${imageMeta}},
  'targetImage':targetImage{${imageMeta}},
 
`
export type QuoteResult = {
  author?: string
  quote?: string
  subtitle?: string
  authorImage?: ImageMetaResult
  targetImage?: ImageMetaResult
  link?: null | { type: string; slug: string }
}

export const QuotesBlockQuery = (locale: string) => `
_type == "quotes" => {
  ...,
  items[]->{${QuoteQuery(locale)}}
}
`

export interface QuotesBlockResult extends PageBuilderBlockBase {
  _type: 'quotes'
  items: QuoteResult[]
}
