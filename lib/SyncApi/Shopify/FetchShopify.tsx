import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { log } from '../logging'
import { SanityProduct } from '../SanityArtwork'

import Shopify from 'shopify-api-node'
// https://github.com/MONEI/Shopify-api-node

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_STORE_ID || '',
  accessToken: process.env.SHOPIFY_API_PASSWORD || 'your-oauth-token',
})

const shopifyConfig = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': process.env.SHOPIFY_API_PASSWORD,
}

export default class FetchShopify {
  productId: number | null = null

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
      log('error', e.response?.data?.errors)
      return null
    }
  }

  unPublish = async (productId: number) => {
    await shopify.product.update(productId, { status: 'draft' })
  }
  publish = async (productId: number) => {
    await shopify.product.update(productId, { status: 'active' })
  }
  fetchProduct = async (productId: number) => {
    return await shopify.product.get(productId)
  }
  eraseProduct = async (productId: number) => {
    return await shopify.product.delete(productId)
  }
  getChecksum = async () => {
    this.checkInitState()
    try {
      const result = await shopify.metafield.list({
        metafield: {
          owner_resource: 'product',
          owner_id: this.productId,
        },
      })
      const checkSum = result.find((item) => item.key === 'checksum_syncData')
      if (!checkSum) {
        console.log('error', 'unable to find Checksum')
        return null
      }
      return checkSum.value as string
    } catch (error) {
      console.log('error', 'unable to find Checksum')
      return null
    }
  }

  setChecksum = async (checksum: string) => {
    this.checkInitState()
    log('info', `setting checksum `)

    const createdMetafield = await shopify.metafield.create({
      key: 'checksum_syncData',
      namespace: 'syncData',
      value: checksum,
      value_type: 'string',
      owner_resource: 'product',
      owner_id: this.productId,
    })
    if (!(createdMetafield.value === checksum)) {
      log('error', `Error setting checksum `)
    }
  }

  // setSanityIdMeta = async (sanityId: string) => {
  //   this.checkInitState()
  //   log('info', `setting SanityIdMeta `)
  //   const createdMetafield = await shopify.metafield.create({
  //     key: 'sanityId_syncData',
  //     namespace: 'syncData',
  //     value: sanityId,
  //     value_type: 'string',
  //     owner_resource: 'product',
  //     owner_id: this.productId,
  //   })
  //   if (!(createdMetafield.value === sanityId)) {
  //     log('error', `Error setting SanityIdMeta ${sanityId}`)
  //   }
  // }

  createProduct = async (product: SanityProduct, checksum: string) => {
    log('info', `creating product ${product.name} `)
    const createdProduct = await shopify.product.create({
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
    await shopify.productListing.create(this.productId, {
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
    log('info', `updating Product ${product.name}`)

    if (!this.productId) return

    const productResult = await shopify.product.update(this.productId, {
      status: draft ? 'draft' : 'active',
      title: product.name,
      body_html: `<p>${product.description}</p>`,
      vendor: 'MeetFrida',
      product_type: 'artwork',
      published_scope: 'global',
    })

    await shopify.productVariant.update(productResult.variants[0].id, {
      price: product.price,
    })

    await this.setChecksum(checksum)

    return {
      shopify_product_id: productResult.id + '',
      shopify_variant_id: productResult.variants[0].id + '',
      shopify_handle: productResult.handle,
    }
  }
}