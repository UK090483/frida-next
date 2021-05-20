import sanityClient, { SanityClient } from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'
const {
  SANITY_PROJECT_DATASET,
  SANITY_PROJECT_ID,
  SANITY_API_TOKEN,
} = process.env

const handleCreate = async (
  id: string,
  s: SanityClient,
  transactionId: string
) => {}

const handleDeleted = async (
  id: string,
  s: SanityClient,
  transactionId: string
) => {}

const handleUpdate = async (
  id: string,
  s: SanityClient,
  transactionId: string
) => {
  try {
    const item = await s.getDocument(id)
    if (!item)
      return console.error(
        `handleUpdate Error:item with id ${id} could not be found handleUpdate`
      )

    // const nextDoc = await s.patch(id).set({ transactionId }).commit()
  } catch (error) {
    console.error(`handleUpdate Error: documentId: ${id}, Error: ${error} `)
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: {
      transactionId,
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
      created.map(
        (id: string) => sanity && handleCreate(id, sanity, transactionId)
      )
    )
  }
  if (deleted.length > 0) {
    await Promise.all(
      updated.map(
        (id: string) => sanity && handleDeleted(id, sanity, transactionId)
      )
    )
  }
  if (updated.length > 0) {
    await Promise.all(
      updated.map(
        (id: string) => sanity && handleUpdate(id, sanity, transactionId)
      )
    )
  }

  return res.status(200).json({ message: 'we are getting there' })
}

export default handler
