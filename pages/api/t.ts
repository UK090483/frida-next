import SanityUpdateHandler from '@lib/SyncApi/SanityUpdateHandler'
// import SanityArtwork from '@lib/SyncApi/SanityArtwork'
import FetchShopify from '@lib/SyncApi/FetchShopify'

import sanityClient, { SanityClient } from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'
const { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID, SANITY_API_TOKEN } =
  process.env

type shopifyArtwork = { id: number; title?: string; product_type?: string }
type SanityArtwork = {
  _id: string
  shopify_product_id: string
  shopify_variant_id: string
}
let allShopifyArtworks: shopifyArtwork[] | null = null
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

  const shop = new FetchShopify()

  const allArtworks: (lastId: string) => Promise<shopifyArtwork[]> = async (
    lastId
  ) => {
    const fetched = await shop.fetch(
      `products.json?limit=50${lastId ? `&since_id=${lastId}` : ''}`,
      null,
      'GET'
    )
    const results = fetched?.data?.products as shopifyArtwork[]

    if (results.length > 0) {
      return results.concat(
        await allArtworks(results[results.length - 1].id + '')
      )
    } else {
      return results
    }
  }

  const getSanityArtworks = async () => {
    if (!sanity) return []
    return (await sanity.fetch(
      `*[_type=='artwork']{ _id, name,shopify_product_id ,  shopify_variant_id}`
    )) as SanityArtwork[]
  }

  if (!allShopifyArtworks) {
    allShopifyArtworks = await allArtworks('0')
  }

  const AllSanityArtworks = await getSanityArtworks()
  const duplicates = []

  const fullConnected = []
  const waste = []
  const sanityUnconnected = []
  const shopifyProducts = []

  for (const [i, iterator] of allShopifyArtworks.entries()) {
    const artworks = AllSanityArtworks.filter(
      (i) => i.shopify_product_id === iterator.id + ''
    )
    if (artworks.length > 1) {
      duplicates.push({
        shopify_product_id: iterator.id,
        shopify_title: iterator.title,
        sanityArtwork: artworks,
      })
    }
    if (artworks.length === 1) {
      fullConnected.push({
        shopify_product_id: iterator.id,
        shopify_title: iterator.title,
        sanityArtwork: artworks,
      })
    }
    if (artworks.length === 0) {
      if (iterator.product_type === 'artwork') {
        waste.push({
          shopify_product_id: iterator.id,
          shopify_title: iterator.title,
          sanityArtwork: artworks,
        })
      }
    }
    if (iterator.product_type !== 'artwork') {
      shopifyProducts.push(iterator)
    }
  }

  for (const i of AllSanityArtworks) {
    const res = allShopifyArtworks.filter(
      (s) => s.id + '' === i.shopify_product_id
    )

    if (res.length === 0) {
      sanityUnconnected.push(i)
    }
  }

  const handleConnect = async (id: string) => {
    if (!sanity) return
    const updater = new SanityUpdateHandler(id, sanity)
    const syncData = await updater.updateShopifyArtwork()
    if (!syncData) {
      console.log('no syncData')
      return
    }
    await updater.sanityArtwork.setSyncData(syncData)
  }

  const handleCreate = async (id: string) => {
    if (!sanity) return
    const updater = new SanityUpdateHandler(id, sanity)
    await updater.run()
  }

  return res.status(200).json({
    duplicates,
    fullConnected,
    waste,
    sanityCount: AllSanityArtworks.length,
    sanityUnconnected,
    shopifyProducts,
    // sanityUnconnected,
  })
}

export default handler

// Get all Artworks from shopify and find the right fit on sanity - > sync
