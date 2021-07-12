// import SanityUpdateHandler from '@lib/SyncApi/SanityUpdateHandler'
// import SanityArtwork from '@lib/SyncApi/SanityArtwork'
import FetchShopify from '@lib/SyncApi/FetchShopify'
import ShopifyArtwork from '@lib/SyncApi/ShopifyArtwork'
import sanityClient, { SanityClient } from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'
const { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID, SANITY_API_TOKEN } =
  process.env

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let sanity: undefined | SanityClient

  if (SANITY_PROJECT_DATASET && SANITY_PROJECT_ID && SANITY_API_TOKEN) {
    sanity = sanityClient({
      dataset: SANITY_PROJECT_DATASET,
      projectId: SANITY_PROJECT_ID,
      token: SANITY_API_TOKEN,
      apiVersion: '2019-01-29',
      useCdn: false,
    })
  }

  if (!sanity)
    return res.status(200).json({
      message: 'we are not getting there',
    })

  const artworks: any[] = await sanity.fetch(
    `*[_type=='artwork' && !(_id in path('drafts.**'))]{ _id, name,shopify_product_id}`
  )

  const count = artworks.length
  const countWith = artworks.filter((i) => !!i.shopify_product_id).length
  const countNotDuplicates = [
    ...new Set(
      artworks
        .filter((i) => !!i.shopify_product_id)
        .map((i) => i.shopify_product_id)
    ),
  ].length

  const sorted = artworks
    .filter((i) => !!i.shopify_product_id)
    .sort((a, b) => a.shopify_product_id - b.shopify_product_id)
  return res.status(200).json({
    message: 'we are getting there',
    count,
    countWith,
    countNotDuplicates,
    sorted,
  })
}

export default handler
