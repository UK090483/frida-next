// import { SanityUpdateHandler } from '@lib/SyncApi/old/handleSanityUpdate copy'
import {
  SanityProduct,
  sanitySyncArtworkQuery,
} from '@lib/SyncApi/SanityArtwork'
import sanityClient, { SanityClient } from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID, SANITY_API_TOKEN } =
  process.env

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {} = req

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
    return res
      .status(409)
      .json({ message: 'unable to establish sanity Client' })

  const syncer = new sanityShopifySync(sanity)

  await syncer.run()

  return res
    .status(200)
    .json({ message: 'we are getting there', artworks: syncer.sanityArtworks })
}

export default handler

class sanityShopifySync {
  s: SanityClient | null

  sanityArtworks: string[] | null = []
  constructor(s: SanityClient) {
    this.s = s
  }

  getArtworks = async () => {
    this.sanityArtworks = this.s
      ? await this.s.fetch<string[]>(`*[_type == 'artwork'][0...100]._id`)
      : null
  }

  syncArtwork = async (sanityDocId: string) => {
    if (!this.s) return
    // const sanityUpdateHandler = new SanityUpdateHandler(sanityDocId, this.s)
    // await sanityUpdateHandler.run()
  }

  syncArtworks = async () => {
    if (!this.sanityArtworks) return null

    for (const artworkId of this.sanityArtworks) {
      await this.syncArtwork(artworkId)
    }
  }

  run = async () => {
    // await this.getArtworks()
    // await this.syncArtworks()
  }
}
