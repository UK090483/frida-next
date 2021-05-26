import { SiteResult } from '@lib/queries/cache'
import {
  artworkCardQuery,
  ArtworkCardResult,
} from 'contentTypes/Artwork/ArtworkCard'

import { imageMeta, ImageMetaResult } from '../../../lib/queries/snippets'

export const artworkSingleViewQuery = `
_type,
'slug':slug.current,
'artistName':artist->anzeigeName,
'artistDescription':artist->description,
'artistDescription_en':artist->description_en,
'artistWebLink':artist->webLink,
'instagramLink':artist->instagramLink,
'artworkName':name,
availability,
width,
height,
depth,
description,
description_en,
price,
'medium':medium->name,
'stil':stil->name,
'banner':banner,
'image':@.image.asset._ref,
'shopify_handle':@.shopify_handle,
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
  relatedArtworks: ArtworkCardResult[]
  randomArtworks: ArtworkCardResult[]
  site: SiteResult
}
