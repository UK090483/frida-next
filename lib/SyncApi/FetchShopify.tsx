import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { log } from './logging'
import { SanityProduct } from './SanityArtwork'

const shopifyConfig = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': process.env.SHOPIFY_API_PASSWORD,
}

export default class FetchShopify {
  productId: string | null = null

  init = (productId: string) => {
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

  fetchProduct = async () => {
    this.checkInitState()
    const res = await this.fetch(`products/${this.productId}.json`, {}, 'GET')
    if (!res?.data?.product) {
      return null
    }
    const { title, body_html, handle, variants, image, id } = res.data.product
    return {
      title: title,
      body: body_html,
      handle: handle,
      price: variants[0].price,
      image: image.src,
      id: id + '',
      variant_id: variants[0].id + '',
    }
  }

  getChecksum = async () => {
    this.checkInitState()
    const res = await this.fetch(
      `products/${this.productId}/metafields.json`,
      undefined,
      'GET'
    )

    if (!res?.data?.metafields) {
      return null
    }

    const cS = res.data.metafields.find(
      (item: any) => item.key === 'checksum_syncData'
    )

    if (!cS) {
      console.log('error', 'unable to find Checksum')
      return null
    }
    return cS.value as string
  }
  setChecksum = async (checksum: string) => {
    this.checkInitState()
    log('info', `setting checksum `)
    const res = await this.fetch(
      `products/${this.productId}/metafields.json`,
      {
        metafield: {
          key: 'checksum_syncData',
          namespace: 'syncData',
          value: checksum,
          value_type: 'string',
        },
      },
      'POST'
    )

    if (!(res?.data?.metafield?.value === checksum)) {
      log('error', `Error setting checksum ${res?.data}`)
    }
  }
  setSanityIdMeta = async (sanityId: string) => {
    this.checkInitState()
    log('info', `setting SanityIdMeta  `)
    const res = await this.fetch(
      `products/${this.productId}/metafields.json`,
      {
        metafield: {
          key: 'sanityId_syncData',
          namespace: 'syncData',
          value: sanityId,
          value_type: 'string',
        },
      },
      'POST'
    )

    if (!(res?.data?.metafield?.value === sanityId)) {
      log('error', `Error setting SanityIdMeta ${res?.data}`)
    }
  }

  createProduct = async (product: SanityProduct, checksum: string) => {
    log('info', `creating product ${product.name} `)

    try {
      const res = await this.fetch(
        'products.json',
        {
          product: {
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
          },
        },
        'POST'
      )

      if (!res) return null

      if (res.data.product.id) {
        this.productId = res.data.product.id
        await axios({
          url: `https://${process.env.SHOPIFY_STORE_ID}.myshopify.com/admin/api/2021-04//product_listings/${res.data.product.id}.json`,
          method: 'PUT',
          headers: shopifyConfig,
          data: {
            product_listing: {
              product_id: res.data.product.id,
            },
          },
        })
      }

      await this.setChecksum(checksum)
      await this.setSanityIdMeta(product._id)

      const { handle, variants, id } = res.data.product

      return {
        shopify_product_id: id + '',
        shopify_variant_id: variants[0].id + '',
        shopify_handle: handle,
      }
    } catch (error) {
      log(
        'error',
        `Problems while creating Product ${product.name}, Error:${error}`
      )
      return null
    }
  }
  setProductDraft = async (productId: string) => {
    await this.fetch(
      `products/${productId}.json`,
      {
        product: {
          id: 632910392,
          status: 'draft',
        },
      },
      'PUT'
    )
    await this.setChecksum('draft')
  }

  updateProduct = async (
    productId: string,
    product: SanityProduct,
    checksum: string
  ) => {
    if (!this.productId) {
      this.productId = productId
    }
    log('info', `updating Product ${product.name}`)
    try {
      const res = await this.fetch(
        `products/${productId}.json`,
        {
          product: {
            status: 'active',
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
            variants: [
              {
                inventory_quantity:
                  product.availability === 'availabil' ? 1 : 0,
                inventory_management: 'shopify',
                price: product.price,
                requires_shipping: false,
              },
            ],
          },
        },
        'PUT'
      )

      if (!res) return null
      await this.setChecksum(checksum)
      await this.setSanityIdMeta(product._id)

      const { handle, variants, id } = res.data.product

      return {
        shopify_product_id: id + '',
        shopify_variant_id: variants[0].id + '',
        shopify_handle: handle,
      }
    } catch (error) {
      log(
        'error',
        `Problems while updating Product ${product.name}, Error:${error}`
      )
      return null
    }
  }
}
