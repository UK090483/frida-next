import { PageBuilderBlockBase } from '../pageBuilderQueries'

import React from 'react'
import Quotes from '@components/Quote/Quotes'
import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'

export type QuoteResult = {
  author?: string
  quote?: string
  quote_en?: string
  subtitle?: string
  subtitle_en?: string
  authorImage?: ImageMetaResult
  targetImage?: ImageMetaResult
  link?: null | { type: string; slug: string }
}

export const QuoteQuery = `
  author,
  subtitle,
  subtitle_en,
  quote,
  quote_en,
  'link':link->{'slug':slug.current,'type':_type },
  'authorImage':image{${imageMeta}},
  'targetImage':targetImage{${imageMeta}},
 
`

export const QuotesBlockQuery = `
_type == "quotes" => {
  ...,
  items[]->{${QuoteQuery}}
}
`
export interface QuotesBlockResult extends PageBuilderBlockBase {
  _type: 'quotes'
  items: QuoteResult[]
}

const ProductsBlock: React.FC<QuotesBlockResult> = (props) => {
  return <Quotes {...props} />
}

export default ProductsBlock
