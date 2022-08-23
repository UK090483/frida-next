import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { log } from '../logging'
import { SanityProduct } from '../SanityArtwork'

import Shopify from 'shopify-api-node'
// https://github.com/MONEI/Shopify-api-node

const shopifyConfig = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': process.env.SHOPIFY_API_PASSWORD,
}

export default class FetchShopify {
  productId: number | null = null
  shopifyClient: Shopify
  logger: typeof log
  constructor(shopifyClient: Shopify, logger: typeof log) {
    this.shopifyClient = shopifyClient
    this.logger = logger
  }

  init = (productId: number) => {
    this.productId = productId
  }

  checkInitState = () => {
    if (!this.productId) throw 'call init first FetchShopify'
  }

  fetch = async (
    path: string,
    data: any,
    method: AxiosRequestConfig['method']
  ) => {
    try {
      const res = await axios({
        url: `https://${process.env.SHOPIFY_STORE_ID}.myshopify.com/admin/api/2021-07/${path}`,
        method: method,
        headers: shopifyConfig,
        ...(data ? { data } : {}),
      })
      return res
    } catch (error) {
      const e = error as AxiosError
      this.logger('error', e.response?.data?.errors)
      return null
    }
  }

  unPublish = async (productId: number) => {
    await this.shopifyClient.product.update(productId, { status: 'draft' })
  }
  publish = async (productId: number) => {
    await this.shopifyClient.product.update(productId, { status: 'active' })
  }
  fetchProduct = async (productId: number) => {
    return await this.shopifyClient.product.get(productId)
  }
  eraseProduct = async (productId: number) => {
    return await this.shopifyClient.product.delete(productId)
  }
  getChecksum = async (productId: number) => {
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

  setChecksum = async (checksum: string) => {
    this.checkInitState()
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

  createProduct = async (product: SanityProduct, checksum: string) => {
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
    // await this.setSanityIdMeta(product._id)
    const { handle, variants, id } = createdProduct
    return {
      shopify_product_id: id + '',
      shopify_variant_id: variants[0].id + '',
      shopify_handle: handle + '',
    }
  }

  updateProduct = async (
    productId: number,
    product: SanityProduct,
    checksum: string,
    draft: boolean
  ) => {
    if (!this.productId) {
      this.productId = productId
    }
    this.logger('info', `updating Product ${product.name}`)

    if (!this.productId) return

    const productResult = await this.shopifyClient.product.update(
      this.productId,
      {
        status: draft ? 'draft' : 'active',
        title: product.name,
        body_html: `<p>${product.description}</p>`,
        vendor: 'MeetFrida',
        product_type: 'artwork',
        published_scope: 'global',
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
