import { imageMeta, ImageMetaResult } from 'pageBuilder/queries/snippets'

import {
  QuoteQuery,
  QuoteResult,
} from 'pageBuilder/Blocks/QuotesBlock/QuotesBlock.query'

import { layoutQuery } from 'pageBuilder/Layout/layoutQuery'
import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'

import {
  artworkCardQuery,
  ArtworkCardResult,
} from 'PageTypes/Artwork/ArtworkCard.query'

import { FridaColors } from 'types'
import { seoQuery } from './ArtistSingle.seoQuery'

export const artistSingleView = (locale: string) => `
${body(locale)}
initBgColor,
'prevImage':prevImage{${imageMeta}},
'mainImage':mainImage{${imageMeta}},
'imageGallery':imageGallery[]{${imageMeta}},
'slug':slug.current,
'name':anzeigeName,
'description': coalesce(description_${locale},description),
webLink,
instagramLink,
'quotes':*[_type == 'quote' && references(^._id)]{${QuoteQuery(locale)}},
'relatedArtworks':*[_type == 'artwork' && references(^._id)]{
    ${artworkCardQuery}
},
${layoutQuery(locale)},
${seoQuery}
`

export type ArtistPageResult = {
  initBgColor: FridaColors
  slug: string
  name: string | null
  prevImage: ImageMetaResult | null
  mainImage: ImageMetaResult | null
  imageGallery: null | ImageMetaResult[]
  description: string | null
  webLink: string | null
  instagramLink: string | null
  relatedArtworks: ArtworkCardResult[]
  quotes: QuoteResult[]
  content?: PageBodyResult
}
