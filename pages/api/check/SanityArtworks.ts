import { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'
import type { SanityClient } from '@sanity/client'
const { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID, SANITY_API_TOKEN } =
  process.env

export type SanityCheckArtwork = {
  _id: string
  shopify_product_id?: string
  shopify_variant_id?: string
  price: number
  name: string
  isNft: boolean | null
}

export type FetchSanityArtworkResult = {
  SanityArtworks: SanityCheckArtwork[]
  SanityNFTArtworks: SanityCheckArtwork[]
}
let cache: SanityCheckArtwork[] | null = null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (cache)
  //   return res.status(200).json({
  //     SanityArtworks: cache.filter((a) => !a.isNft),
  //     SanityNFTArtworks: cache.filter((a) => a.isNft),
  //   })

  let sanity: undefined | SanityClient

  if (SANITY_PROJECT_DATASET && SANITY_PROJECT_ID && SANITY_API_TOKEN) {
    sanity = sanityClient({
      dataset: SANITY_PROJECT_DATASET,
      projectId: SANITY_PROJECT_ID,
      // token: SANITY_API_TOKEN,
      apiVersion: '2019-01-29',
      useCdn: true,
    })
  }

  if (!sanity)
    return res.status(200).json({
      message: 'we are not getting there',
    })

  const getSanityArtworks = async () => {
    if (!sanity) return []
    return (await sanity.fetch(
      `*[_type=='artwork']{ _id, name,shopify_product_id ,  shopify_variant_id,price ,shopify_handle,name ,isNft }`
    )) as SanityCheckArtwork[]
  }

  cache = await getSanityArtworks()

  return res.status(200).json({
    SanityArtworks: cache.filter((a) => !a.isNft),
    SanityNFTArtworks: cache.filter((a) => a.isNft),
  })
}
