import { NextApiRequest, NextApiResponse } from 'next'
import FetchShopify from '@lib/SyncApi/Shopify/FetchShopify'

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
  const shopify = new FetchShopify()

  const createProduct = await shopify.createProduct(
    {
      name: 'testName',
      description: 'test description',
      price: 123,
      _id: 'testID',
      imageSrc:
        'https://cdn.sanity.io/images/ypuaahj7/production/dd9f7957011b01d5b2c8dbcffc43fe3ec84dbcf9-4515x3014.jpg?w=420&max-w=1080&q=75',
      slug: 'testSlug',
      availability: 'availabil',
    },
    'testChecksUm'
  )
  if (!createProduct) {
    return res.status(200).json({})
  }
  const createdID = parseInt(createProduct?.shopify_product_id)

  shopify.init(createdID)
  const fetchedProduct = await shopify.fetchProduct(createdID)

  await shopify.unPublish(createdID)

  const unPublishedProduct = await shopify.fetchProduct(createdID)

  if (unPublishedProduct.status !== 'draft') {
    return res.status(200).json({})
  }

  await shopify.publish(createdID)

  const publishedProduct = await shopify.fetchProduct(createdID)
  if (publishedProduct.status !== 'active') {
    return res.status(200).json({})
  }

  const erasedProduct = await shopify.eraseProduct(createdID)

  console.log(erasedProduct)

  return res.status(200).json({
    createProduct,
    fetchedProduct,
  })
}
