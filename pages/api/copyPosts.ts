import Omit from 'lodash/omit'
import type { NextApiRequest, NextApiResponse } from 'next'

import { previewClient } from 'lib/Sanity/sanity.server'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = await previewClient.fetch(`*[_type == 'post']{...}`)

  // posts.forEach(async (post: any) => {
  //   await previewClient.create({
  //     ...Omit(post, ['_id', 'releaseDate', 'categories']),
  //     _type: 'exhibition',
  //   })
  // })

  return res.status(200).json({ message: 'we are getting there', posts })
}

export default handler
