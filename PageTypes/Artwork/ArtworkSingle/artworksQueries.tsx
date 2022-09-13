import {
  QuoteQuery,
  QuoteResult,
} from 'pageBuilder/Blocks/QuotesBlock/QuotesBlock.query'
import { layoutQuery } from 'pageBuilder/Layout/layoutQuery'
import { buildSeoQuery } from 'pageBuilder/Seo/seoQuery'
import {
  imageMeta,
  ImageMetaResult,
  SeoResult,
} from '../../../lib/queries/snippets'
import { artworkCardQuery, ArtworkCardResult } from '../ArtworkCard.query'

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

const seoQuery = buildSeoQuery({
  metaTitle: { derived: `'Kaufen Sie '+ name + ' jetzt auf MeetFrida.art',` },
  metaDesc: { derived: '"MeetFrida | Artwork:" + name ,' },
  shareDesc: { derived: `name+' by ' + artist->anzeigeName,` },
  shareTitle: { derived: `name+' by ' + artist->anzeigeName,` },
  shareGraphic: { derived: 'image ,' },
  url: { derived: `'artwork/' +slug.current ` },
})

export const artworkSingleViewQuery = (locale: string) => `
_type,
isNft,
nftInfo,
nftUrl,
ethPrice,
'slug':slug.current,

 ...(artist->{
   'artistDescription': coalesce(description_${locale},description),
   'artistSlug':slug.current,
   'artistName':anzeigeName,
   'artistWebLink':webLink,
   'instagramLink':instagramLink,
  }),

'artworkName':name,
availability,
'hints':hints[]{${productHintQuery}},
width,
height,
depth,
'description': coalesce(description_${locale},description),

price,
'medium':medium->name,
'stil':stil->name,
'banner':banner,
'quotes':*[_type == 'quote' &&  (references(^.artist._ref) || references(^._id))]{${QuoteQuery(
  locale
)}},
'image':@.image.asset._ref,
'video': mux.asset-> ,
'shopify_handle':shopify_handle,
'shopify_product_id':shopify_product_id,
'shopify_variant_id':shopify_variant_id,
'photo': image {
  ${imageMeta}
},
'relatedArtworks':*[_type == 'artwork' && references(^.artist._ref)]{
    ${artworkCardQuery}
},
'randomArtworks':*[_type == 'artwork'][0...8]{
    ${artworkCardQuery}
},
seo,
${layoutQuery(locale)},
${seoQuery}
`

export type ArtworkSingleViewResult = {
  _type: 'artwork'
  slug: string
  isNft: boolean | null
  nftInfo: string | null
  nftUrl: string | null
  ethPrice: number | null
  artistName: null | string
  artistDescription: null | string
  artistSlug: null | string
  artistWebLink: null | string
  instagramLink: null | string
  artworkName: null | string
  availability: null | string
  width: null | number
  height: null | number
  depth: null | number
  description: null | string
  price: null | number
  medium: null | string
  stil: null | string
  banner: null | string
  photo: null | ImageMetaResult
  video: any | null
  quotes: QuoteResult[]
  relatedArtworks: ArtworkCardResult[]
  randomArtworks: ArtworkCardResult[]
  shopify_product_id: null | string
  shopify_variant_id: null | string
  hints?: ProductHintResult[] | null
  seo: null | Partial<SeoResult>
}

const query = (
  locale = ''
) => `*[_type == "artwork" && slug.current == $slug ][0]{
  ${artworkSingleViewQuery(locale)}
}`

export default query
