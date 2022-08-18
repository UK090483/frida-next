import SanitySyncHandler from '@lib/SyncApi/SanitySyncHandler'
import sanityClient, { SanityClient } from '@sanity/client'

import type { NextApiRequest, NextApiResponse } from 'next'
const { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID, SANITY_API_TOKEN } =
  process.env

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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body?._id
  const type = req.body?._type

  console.log(req?.body)
  if (!sanity) {
    console.error('unable to establish sanity Client')
    return res
      .status(200)
      .json({ message: 'unable to establish sanity Client' })
  }

  if (id && type === 'artwork') {
    const updater = new SanitySyncHandler(id, sanity)
    await updater.run()
  }

  return res.status(200).json({ message: 'we are getting there' })
}

export default handler
