import { getSanityClient } from '@lib/sanity'
import { site } from './pageQueries'
import { imageMeta, artworkCard } from './snippets'

const artworkSingleView = `
'artwork':{
    'slug':@.slug.current,
    'artistName':@.artist->anzeigeName,
    'artistDescription':@.artist->description,
    'artistWebLink':@.artist->webLink,
    'instagramLink':@.artist->instagramLink,
    'artworkName':@.name,
    'availability':@.availability,
    'width':@.width,
    'height':@.height,
    'depth':@.depth,
    'description':@.description,
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
    ${artworkCard}
},
'randomArtworks':*[_type == 'artwork'][15...20]{
    ${artworkCard}
},

${site}
`

export const getArtworkPage = async (slug: string, preview: any) => {
  const slugs = [`/${slug}`, slug, `/${slug}/`]

  const query = `
      
        *[_type == "artwork" && slug.current in ${JSON.stringify(slugs)}][0]{
          ${artworkSingleView},
        }
      `

  const data = await getSanityClient(preview).fetch(query)

  return data
}
