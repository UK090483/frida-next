import { SanityProduct } from '../SanityArtwork'
import FetchShopify from './FetchShopify'
import Shopify from 'shopify-api-node'

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_STORE_ID || '',
  accessToken: process.env.SHOPIFY_API_PASSWORD || 'your-oauth-token',
})

export default class ShopifyArtwork {
  data: Shopify.IProduct | null = null
  productId: number | null = null
  fetchShopify = new FetchShopify()
  loaded = false
  checksum: string | null = null
  constructor(productId?: number) {
    if (productId) {
      this.productId = productId
      this.fetchShopify.init(productId)
    }
  }
  init = (productId: number | string) => {
    this.productId = parseInt(productId + '')
    this.fetchShopify.init(this.productId)
  }

  getData = async () => {
    if (!this.data && this.productId) {
      this.data = await this.fetchShopify.fetchProduct(this.productId)
      this.loaded = true
    }
    return this.data
  }
  shouldUpdate = async () => {
    return await !!this.getCheckSum()
  }
  getCheckSum = async () => {
    if (!this.checksum) {
      this.checksum = await this.fetchShopify.getChecksum()
    }
    return this.checksum
  }
  setChecksum = async (checksum: string) => {
    this.fetchShopify.setChecksum(checksum)
  }
  createArtwork = async (product: SanityProduct, checksum: string) => {
    return await this.fetchShopify.createProduct(product, checksum)
  }

  updateArtwork = async (
    productId: number,
    product: SanityProduct,
    checksum: string,
    draft: boolean
  ) => {
    return await this.fetchShopify.updateProduct(
      productId,
      product,
      checksum,
      draft
    )
  }
  unPublish = async (productId: number) => {
    await shopify.product.update(productId, { status: 'draft' })
  }
  publish = async (productId: number) => {
    await shopify.product.update(productId, { status: 'active' })
  }
}
