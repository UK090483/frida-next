import SanityUpdateHandler from '@lib/SyncApi/SanityUpdateHandler'
import sanityClient, { SanityClient } from '@sanity/client'

import type { NextApiRequest, NextApiResponse } from 'next'
const { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID, SANITY_API_TOKEN } =
  process.env

const handleCreate = async (id: string, s: SanityClient) => {
  const updater = new SanityUpdateHandler(id, s)
  await updater.run()
}

const handleDeleted = async (id: string, s: SanityClient) => {
  s && console.log('delete' + id)
}

const handleUpdate = async (id: string, s: SanityClient) => {
  const updater = new SanityUpdateHandler(id, s)
  await updater.run()
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: {
      ids: { created, deleted, updated },
    },
  } = req

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

  if (created.length > 0) {
    await Promise.all(
      created.map((id: string) => sanity && handleCreate(id, sanity))
    )
  }
  if (deleted.length > 0) {
    await Promise.all(
      updated.map((id: string) => sanity && handleDeleted(id, sanity))
    )
  }
  if (updated.length > 0) {
    await Promise.all(
      updated.map((id: string) => sanity && handleUpdate(id, sanity))
    )
  }

  return res.status(200).json({ message: 'we are getting there' })
}

export default handler
