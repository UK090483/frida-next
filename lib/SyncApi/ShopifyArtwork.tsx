import { SanityProduct } from './SanityArtwork'
import Shopify from 'shopify-api-node'

import type { Logger } from './logger'
type ShopifyArtworkProps = {
  productId?: number
  shopifyClient: Shopify
  logger: Logger
}

export default class ShopifyArtwork {
  data: Shopify.IProduct | null = null
  productId: number | null = null
  loaded = false
  checksum: string | null = null
  shopifyClient: Shopify
  logger: Logger

  constructor({ productId, shopifyClient, logger }: ShopifyArtworkProps) {
    this.logger = logger
    this.shopifyClient = shopifyClient
    if (productId) {
      this.productId = productId
    }
  }

  init = (productId: number | string) => {
    this.productId = parseInt(productId + '')
  }

  getData = async () => {
    if (!this.data && this.productId) {
      this.data = await this.fetchProduct(this.productId)
      this.loaded = true
    }
    return this.data
  }

  fetchProduct = async (productId: number) => {
    return await this.shopifyClient.product.get(productId)
  }

  fetchChecksum = async (productId: number) => {
    try {
      const result = await this.shopifyClient.metafield.list({
        metafield: {
          owner_resource: 'product',
          owner_id: productId,
        },
      })
      const checkSum = result.find((item) => item.key === 'checksum_syncData')
      if (!checkSum) {
        this.logger('error', 'unable to find Checksum')
        return null
      }
      return checkSum.value as string
    } catch (error) {
      this.logger('error', 'unable to find Checksum')
      return null
    }
  }

  getCheckSum = async () => {
    if (!this.productId) {
      throw new Error('missing productId for getting checksum')
    }

    if (!this.checksum) {
      this.checksum = await this.fetchChecksum(this.productId)
    }
    return this.checksum
  }

  setChecksum = async (checksum: string) => {
    this.logger('info', `setting checksum `)

    const createdMetafield = await this.shopifyClient.metafield.create({
      key: 'checksum_syncData',
      namespace: 'syncData',
      value: checksum,
      value_type: 'string',
      owner_resource: 'product',
      owner_id: this.productId,
    })
    if (!(createdMetafield.value === checksum)) {
      this.logger('error', `Error setting checksum `)
    }
  }

  createArtwork = async (product: SanityProduct, checksum: string) => {
    this.logger('info', `creating product ${product.name} `)
    const createdProduct = await this.shopifyClient.product.create({
      title: product.name,
      status: 'active',
      body_html: `<p>${product.description || ' '}</p>`,
      vendor: 'MeetFrida',
      product_type: 'artwork',
      published_scope: 'global',
      images: [
        {
          src: product.imageSrc,
        },
      ],
      variants: [
        {
          inventory_quantity: product.availability === 'sold' ? 0 : 1,
          inventory_management: 'shopify',
          price: product.price,
          requires_shipping: false,
        },
      ],
    })

    this.productId = createdProduct.id
    await this.shopifyClient.productListing.create(this.productId, {
      product_id: this.productId,
    })

    await this.setChecksum(checksum)

    const { handle, variants, id } = createdProduct
    return {
      shopify_product_id: id + '',
      shopify_variant_id: variants[0].id + '',
      shopify_handle: handle + '',
    }
  }
  updateArtwork = async (
    productId: number,
    product: SanityProduct,
    checksum: string,
    draft: boolean
  ) => {
    this.logger('info', `updating Product ${product.name}`)

    if (!this.productId) {
      throw new Error('missing productId for updating checksum')
    }

    const shouldDraft = draft || product.availability === 'sold'

    const productResult = await this.shopifyClient.product.update(
      this.productId,
      {
        status: shouldDraft ? 'draft' : 'active',
        title: product.name,
        body_html: `<p>${product.description}</p>`,
        vendor: 'MeetFrida',
        product_type: 'artwork',
        published_scope: 'global',
        images: [
          {
            src: product.imageSrc,
          },
        ],
      }
    )
    await this.shopifyClient.productVariant.update(
      productResult.variants[0].id,
      {
        price: product.price,
      }
    )
    await this.setChecksum(checksum)
    return {
      shopify_product_id: productResult.id + '',
      shopify_variant_id: productResult.variants[0].id + '',
      shopify_handle: productResult.handle,
    }
  }
}
