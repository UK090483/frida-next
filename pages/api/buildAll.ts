import { sanityClient } from 'lib/Sanity/sanity.server'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(
    `*[_type == 'artwork'][0..200]{'slug':'/artwork/' + slug.current }`
  )

  try {
    const values = await Promise.all(
      slugs.map(({ slug }) => res.revalidate(slug))
    )

    return res.json({ revalidated: true, values })
  } catch (err) {
    console.log(err)

    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
