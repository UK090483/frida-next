import { NextApiRequest, NextApiResponse } from 'next'
import { getSanityClient } from '@lib/sanity.server'
import { imageMeta } from '@lib/queries/snippets'

export interface FridaPreviewData {
  token: string | undefined
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.id) {
    return res.status(401).json({ message: 'Invalid preview request' })
  }
  const { id, type } = req.query

  const query = type === 'artwork' ? artworkQuery : variantQuery
  const result = await getSanityClient().fetch(query, {
    id: type === 'artwork' ? id : parseInt(id.toString()),
  })

  res.status(200).json(result)
}
export default handler

const variantQuery = `
      *[_type == "productVariant" && variantID == $id ][0]{
        _type,
        "product": *[_type == "product" && productID == ^.productID][0]{
          title,
          "slug": slug.current,
          galleryPhotos[]{
            forOption,
            photos[]{
              ${imageMeta}
            }
          },
          listingPhotos[]{
            listingPhoto {${imageMeta}}
          },
        },
        "id": variantID,
        title,
        price,
       
        "photos": {
          'default':*[_type == "product" && productID == ^.productID][0].listingPhotos[].listingPhoto{
            ${imageMeta}
          },
          "cart": *[_type == "product" && productID == ^.productID][0].cartPhotos[]{
            forOption,
            "default": cartPhoto{
              ${imageMeta}
            },
          },
          "listingPhotos": *[_type == "product" && productID == ^.productID][0].listingPhotos[]{
            ${imageMeta}
          },
          
        },
        options[]{
          name,
          position,
          value
        }
      }
    `

const artworkQuery = `
      *[_type == "artwork" && shopify_variant_id == $id][0]{
        _type,
        'product':{
          
          "slug": slug.current,
          'title' :name,
          'subTitle' : artist->anzeigeName
        },
       
        'id': shopify_variant_id,
        price,
        
        "photos":{
          'default': [image{${imageMeta}}],
        },
        
      }
    `
