import Shopify from 'shopify-api-node'
// https://github.com/MONEI/Shopify-api-node
import { NextApiRequest, NextApiResponse } from 'next'
import { CreateArtwork } from '@lib/SyncApi/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const shopify = new Shopify({
    shopName: process.env.SHOPIFY_STORE_ID || '',
    accessToken: process.env.SHOPIFY_API_PASSWORD || 'your-oauth-token',
  })

  const nextProduct: CreateArtwork = {
    title: 'bla',
    body_html: 'blu',
    status: 'active',
    vendor: 'MeetFrida',
    product_type: 'artwork',
    published_scope: 'global',
    variants: [
      {
        inventory_quantity: 30,
        inventory_management: 'shopify',
        price: '45',
        requires_shipping: false,
      },
    ],
  }

  return res.json({})
}
// id: 43282886000862,
// product_id: 7763513213150
