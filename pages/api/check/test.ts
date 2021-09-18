import { checkArtworks } from '@lib/CheckApi/checkArtworks'
import { NextApiRequest, NextApiResponse } from 'next'
import type { FetchSanityArtworkResult } from './SanityArtworks'
import type { FetchShopifyResult } from './ShopifyArtworks'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { SanityArtworks } = (await (
    await fetch('http://localhost:3000/api/check/SanityArtworks')
  ).json()) as FetchSanityArtworkResult

  const { ShopifyArtworks } = (await (
    await fetch('http://localhost:3000/api/check/ShopifyArtworks')
  ).json()) as FetchShopifyResult

  const { errors, duplicates, sanityUnconnected, waste, fullConnected } =
    checkArtworks(ShopifyArtworks, SanityArtworks)

  return res.json({
    SanityArtworks,
    fullConnected,
    errors,
    sanityUnconnected,
    duplicates,
    waste,
  })
}
