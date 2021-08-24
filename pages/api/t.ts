import FetchShopify from '@lib/SyncApi/FetchShopify'

import sanityClient, { SanityClient } from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID, SANITY_API_TOKEN } =
  process.env

type shopifyArtwork = {
  id: number
  title?: string
  product_type?: string
  body_html?: string
  handle?: string
  variants?: { id: number; price: string; inventory_quantity: number }[]
}
type SanityArtwork = {
  _id: string
  shopify_product_id: string
  shopify_variant_id: string
  price: number
  name: string
}
let allShopifyArtworks: shopifyArtwork[] | null = null

const checkErrors = (
  shopifyArwork: shopifyArtwork,
  sanityArtwork: SanityArtwork
) => {
  const error: string[] = []
  const variant_id =
    shopifyArwork.variants &&
    shopifyArwork.variants[0] &&
    shopifyArwork.variants[0].id
  // const price =
  //   shopifyArwork.variants &&
  //   shopifyArwork.variants[0] &&
  //   shopifyArwork.variants[0].price

  if (variant_id && variant_id + '' !== sanityArtwork.shopify_variant_id) {
    error.push('variant_id not equal')
  }

  // if (price && parseFloat(price) !== parseFloat(sanityArtwork.price + '')) {
  //   error.push(
  //     `price not equal ${parseFloat(price)} !== ${parseFloat(
  //       sanityArtwork.price + ''
  //     )}`
  //   )
  // }
  // if (shopifyArwork.title !== sanityArtwork.name) {
  //   error.push('title not equal')
  // }

  return error.length > 0 ? error : null
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let sanity: undefined | SanityClient

  if (req.query.token !== 'konrad') {
    return res.status(401).json({ message: 'Invalid preview request' })
  }

  if (SANITY_PROJECT_DATASET && SANITY_PROJECT_ID && SANITY_API_TOKEN) {
    sanity = sanityClient({
      dataset: SANITY_PROJECT_DATASET,
      projectId: SANITY_PROJECT_ID,
      // token: SANITY_API_TOKEN,
      apiVersion: '2019-01-29',
      // useCdn: true,
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
      `*[_type=='artwork']{ _id, name,shopify_product_id ,  shopify_variant_id,price ,shopify_handle,name }`
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

  type Error = {
    [k: string]: any
    shopify_product_id: number
    shopify_variant_id?: number
    sanityArtwork: SanityArtwork[]
  }
  const errors: Error[] = []

  for (const iterator of allShopifyArtworks) {
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
      const variant_id =
        iterator.variants && iterator.variants[0] && iterator.variants[0].id
      const err = checkErrors(iterator, artworks[0])

      if (err) {
        errors.push({
          error: err,
          shopify_product_id: iterator.id,
          shopify_variant_id: variant_id,
          shopify_title: iterator.title,
          shopifyArtwork: iterator,
          sanityArtwork: artworks,
        })
      } else {
        fullConnected.push({
          shopify_product_id: iterator.id,
          shopify_variant_id: variant_id,
          shopify_title: iterator.title,
          sanityArtwork: artworks,
        })
      }
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

  // const handleConnect = async (id: string) => {
  //   if (!sanity) return
  //   const updater = new SanityUpdateHandler(id, sanity)
  //   const syncData = await updater.updateShopifyArtwork()
  //   if (!syncData) {
  //     console.log('no syncData')
  //     return
  //   }
  //   await updater.sanityArtwork.setSyncData(syncData)
  // }

  // const handleCreate = async (id: string) => {
  //   if (!sanity) return
  //   const updater = new SanityUpdateHandler(id, sanity)
  //   await updater.run()
  // }

  // const handleArtworkVariantIdError = (error: Error) => {
  //   const sanityDocId = error.sanityArtwork[0]._id

  //   const shopify_variant_id = error.shopify_variant_id + ''
  //   if (!sanity) return

  //   console.log('start ' + sanityDocId)
  //   sanity
  //     .patch(sanityDocId) // Document ID to patch
  //     .set({ shopify_variant_id }) // Shallow merge
  //     .commit() // Perform the patch and return a promise
  //     .then(() => {
  //       console.log('done ' + sanityDocId)

  //       // console.log(updatedBike)
  //     })
  //     .catch((err) => {
  //       console.error('Oh no, the update failed: ', err.message)
  //     })
  // }

  return res.status(200).json({
    duplicates,
    fullConnected,
    // waste,
    sanityCount: AllSanityArtworks.length,
    // sanityUnconnected,
    // shopifyProducts,
    errors,
    // sanityUnconnected,
  })
}

export default handler

// Get all Artworks from shopify and find the right fit on sanity - > sync
