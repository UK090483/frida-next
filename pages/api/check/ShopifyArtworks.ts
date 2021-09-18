import { NextApiRequest, NextApiResponse } from 'next'
import FetchShopify from '@lib/SyncApi/FetchShopify'

export type ShopifyCheckArtwork = {
  id: number
  title?: string
  product_type?: string
  body_html?: string
  handle?: string
  variants?: { id: number; price: string; inventory_quantity: number }[]
}

export type FetchShopifyResult = {
  ShopifyArtworks: ShopifyCheckArtwork[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const shop = new FetchShopify()

  const allArtworks: (lastId: string) => Promise<ShopifyCheckArtwork[]> =
    async (lastId) => {
      const fetched = await shop.fetch(
        `products.json?limit=200${lastId ? `&since_id=${lastId}` : ''}`,
        null,
        'GET'
      )
      const results = fetched?.data?.products as ShopifyCheckArtwork[]

      if (results.length > 0) {
        return results.concat(
          await allArtworks(results[results.length - 1].id + '')
        )
      } else {
        return results
      }
    }

  const allShopifyArtworks = await allArtworks('0')

  const parsed = allShopifyArtworks.map((i) => ({
    id: i.id,
    title: i.title,
    product_type: i.product_type,
    body_html: i.body_html,
    handle: i.handle,
    variants: i.variants,
  }))

  return res.status(200).json({
    ShopifyArtworks: parsed.filter((i) => i.product_type === 'artwork'),
    ShopifyMearch: parsed.filter((i) => i.product_type === 'mearch'),
  })
}
