import { SanityProduct } from '../SanityArtwork'
import FetchShopify from './FetchShopify'
import Shopify from 'shopify-api-node'
import { log } from '../logging'

type ShopifyArtworkProps = {
  productId?: number
  shopifyClient: Shopify
  logger: typeof log
}

export default class ShopifyArtwork {
  data: Shopify.IProduct | null = null
  productId: number | null = null
  fetchShopify: FetchShopify
  loaded = false
  checksum: string | null = null
  shopifyClient: Shopify

  constructor({ productId, shopifyClient, logger }: ShopifyArtworkProps) {
    this.fetchShopify = new FetchShopify(shopifyClient, logger)
    this.shopifyClient = shopifyClient
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

  getCheckSum = async () => {
    if (!this.productId) {
      throw new Error('missing productId for getting checksum')
    }

    if (!this.checksum) {
      this.checksum = await this.fetchShopify.getChecksum(this.productId)
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
}
