import SanityUpdateHandler from '@lib/SyncApi/SanityUpdateHandler'
// import SanityArtwork from '@lib/SyncApi/SanityArtwork'
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

  if (!sanity) return res.status(200).json({ message: 'no client' })

  // const Artwork = new SanityArtwork(
  //   '47287fe6-6479-4116-84fb-57a2b9ac0175',
  //   sanity
  // )

  const Updater = new SanityUpdateHandler(
    '18986427-0b41-463e-9543-90a896b2bd7e',
    sanity
  )

  const shopifyA = new ShopifyArtwork('6730999726240')

  shopifyA.getData()

  await Updater.run()

  return res.status(200).json({
    message: 'we are getting there',
  })
}

export default handler
