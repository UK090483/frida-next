import { getSanityClient } from '@lib/sanity'
import {
  imageMeta,
  ImageMetaResult,

  // ArtworkCardResult,
} from './snippets'
import { site, SiteResult } from './pageQueries'
import {
  artworkCardQuery,
  ArtworkCardResult,
} from 'contentTypes/Artwork/ArtworkCard'

export const artworkSingleViewQuery = `
'artwork':{
    'slug':@.slug.current,
    'artistName':@.artist->anzeigeName,
    'artistDescription':@.artist->description,
    'artistDescription_en':@.artist->description_en,
    'artistWebLink':@.artist->webLink,
    'instagramLink':@.artist->instagramLink,
    'artworkName':@.name,
    'availability':@.availability,
    'width':@.width,
    'height':@.height,
    'depth':@.depth,
    'description':@.description,
    'description_en':@.description_en,
    'price':@.price,
    'medium':@.medium->name,
    'stil':@.stil->name,
    'banner':@.banner,
    'image':@.image.asset._ref,
    'shopify_handle':@.shopify_handle,
    'photo': image {
      ${imageMeta}
    }
},

'relatedArtworks':*[_type == 'artwork'][0...3]{
    ${artworkCardQuery}
},
'randomArtworks':*[_type == 'artwork'][15...20]{
    ${artworkCardQuery}
},

seo,
${site}
`

export type ArtworkSingleViewResult = {
  artwork: {
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
  }
  relatedArtworks: ArtworkCardResult[]
  randomArtworks: ArtworkCardResult[]
  site: SiteResult
}

export const getArtworkPage: (
  slug: string,
  preview: string
) => Promise<null | ArtworkSingleViewResult> = async (
  slug: string,
  preview: any
) => {
  const slugs = [`/${slug}`, slug, `/${slug}/`]
  const query = `
        *[_type == "artwork" && slug.current in ${JSON.stringify(slugs)}][0]{
          ${artworkSingleViewQuery},
        }
      `

  return await getSanityClient(preview).fetch(query)
}
