import { SanityClient } from '@sanity/client'

export type SanityProduct = {
  _id: string
  name: string
  price: number
  slug: string
  imageSrc: null | string
  shopify_product_id?: string
  shopify_handle?: string
  description?: string
  availability?: 'sold' | 'availabil'
}

export const sanitySyncArtworkQuery = `
_id,
name,
price,
'slug':slug.current,
'imageSrc':image.asset->url,
shopify_product_id,
shopify_handle,
description,
availability`

export const getSanityArtwork = async (id: string, s: SanityClient) => {
  try {
    const res = (await await s.fetch(
      `*[_type=='artwork' && _id== $id][0]{
     ${sanitySyncArtworkQuery}
      }`,
      {
        id: id,
      }
    )) as SanityProduct
    return res._id ? res : null
  } catch (error) {
    console.error(
      `handleUpdate Error:item with id ${id} could not be found handleUpdate`
    )
    return null
  }
}

export const setSanitySyncData = async (
  sanityDocId: string,
  shopify_product_id: string,
  shopify_handle: string,
  shopify_variant_id: string,
  s: SanityClient
) => {
  const patchRes = await s
    .patch(sanityDocId)
    .set({
      shopify_product_id,
      shopify_variant_id,
      shopify_handle,
    })
    .commit()
}
export const getSanityArtworkCheckSum = async (product: SanityProduct) => {
  return JSON.stringify(product)
}
