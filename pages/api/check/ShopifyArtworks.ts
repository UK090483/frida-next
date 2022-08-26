import { NextApiRequest, NextApiResponse } from 'next'
import Shopify from 'shopify-api-node'

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_STORE_ID || '',
  accessToken: process.env.SHOPIFY_API_PASSWORD || 'your-oauth-token',
})

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
  const allArtworks = async () => {
    let res: Shopify.IProduct[] = []
    let params = { limit: 100 }

    do {
      const products = await shopify.product.list(params)

      res = [...res, ...products]

      params = products.nextPageParameters
    } while (params !== undefined)

    return res
  }

  const allShopifyArtworks = await allArtworks()

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
