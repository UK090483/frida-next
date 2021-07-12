import FetchShopify from './FetchShopify'
import { SanityProduct } from './SanityArtwork'

export type ShopifyArtworkData = {
  title: string
  price?: number
  handle?: string
  body?: string
  image?: string
  id: string
  variant_id: string
}
export default class ShopifyArtwork {
  data: ShopifyArtworkData | null = null
  productId: string | null = null
  fetchShopify = new FetchShopify()
  loaded = false
  checksum: string | null = null
  constructor(productId?: string) {
    if (productId) {
      this.productId = productId
      this.fetchShopify.init(productId)
    }
  }
  init = (productId: string) => {
    this.productId = productId
    this.fetchShopify.init(productId)
  }

  getData = async () => {
    if (!this.data) {
      this.data = await this.fetchShopify.fetchProduct()
      this.loaded = true
    }
    return this.data
  }
  shouldUpdate = async () => {
    return await !!this.getCheckSum()
  }
  getCheckSum = async () => {
    if (!this.checksum) return this.fetchShopify.getChecksum()
    return this.checksum
  }
  setChecksum = async (checksum: string) => {
    this.fetchShopify.setChecksum(checksum)
  }
  createArtwork = async (product: SanityProduct, checksum: string) => {
    return await this.fetchShopify.createProduct(product, checksum)
  }
  updateArtwork = async (
    productId: string,
    product: SanityProduct,
    checksum: string
  ) => {
    return await this.fetchShopify.updateProduct(productId, product, checksum)
  }
  draftArtwork = async (productId: string) => {
    return await this.fetchShopify.setProductDraft(productId)
  }
}
