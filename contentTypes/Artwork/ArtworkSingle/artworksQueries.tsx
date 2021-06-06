import { SiteResult } from '@lib/queries/cache'
import {
  artworkCardQuery,
  ArtworkCardResult,
} from 'contentTypes/Artwork/ArtworkCard'
import { QuoteResult, QuoteQuery } from 'pageBuilder/Blocks/QuotesBlock'

import { imageMeta, ImageMetaResult } from '../../../lib/queries/snippets'

const productHintQuery = `
text,
text_en,
'link':link->{'slug':slug.current,'type':_type}
`
export type ProductHintResult = {
  text?: string | null
  text_en?: string | null
  link?: { slug: string; type: string }
}

export const artworkSingleViewQuery = `
_type,
'slug':slug.current,
'artistName':artist->anzeigeName,
'artistDescription':artist->description,
'artistSlug':artist->slug.current,
'artistDescription_en':artist->description_en,
'artistWebLink':artist->webLink,
'instagramLink':artist->instagramLink,
'artworkName':name,
availability,
'hints':hints[]{${productHintQuery}},
width,
height,
depth,
description,
description_en,
price,
'medium':medium->name,
'stil':stil->name,
'banner':banner,
'quotes':*[_type == 'quote' && references(^._id)]{${QuoteQuery}},
'image':@.image.asset._ref,
'shopify_handle':shopify_handle,
'shopify_product_id':shopify_product_id,
'shopify_variant_id':shopify_variant_id,
'photo': image {
  ${imageMeta}
},
'relatedArtworks':*[_type == 'artwork' && references(^.artist._ref)]{
    ${artworkCardQuery}
},
'randomArtworks':*[_type == 'artwork'][0...10]{
    ${artworkCardQuery}
},
seo,
'site':'getSite'
`

export type ArtworkSingleViewResult = {
  slug: string
  artistName: null | string
  artistDescription: null | string
  artistDescription_en: null | string
  artistSlug: null | string
  artistWebLink: null | string
  instagramLink: null | string
  artworkName: null | string
  availability: null | string
  width: null | number
  height: null | number
  depth: null | number
  description: null | string
  description_en: null | string
  price: null | number
  medium: null | string
  stil: null | string
  banner: null | string
  photo: null | ImageMetaResult
  quotes: QuoteResult[]
  relatedArtworks: ArtworkCardResult[]
  randomArtworks: ArtworkCardResult[]
  shopify_product_id: null | string
  shopify_variant_id: null | string
  site: SiteResult
  hints?: ProductHintResult[] | null
}
