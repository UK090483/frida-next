import { SanityClient } from '@sanity/client'
import { log } from './logging'
import {
  getSanityArtwork,
  SanityProduct,
  setSanitySyncData,
} from './sanitySync'
import {
  createProduct,
  getShopifyChecksum,
  getShopifyProduct,
  setShopifyChecksum,
  ShopifyProduct,
  updateShopifyProduct,
  waitSomeTime,
} from './shopifySync'

export class SanityUpdateHandler {
  sanityArtwork: SanityProduct | null = null
  sanityChecksum: null | string = null
  shopifyProduct: ShopifyProduct | null = null
  shopifyChecksum: null | string = null
  sanityDocId: string
  s: SanityClient
  isLoaded: boolean = false
  isArtwork: boolean = false
  hasShopifyData: boolean = false
  productId: string | null = null

  constructor(sanityDocId: string, s: SanityClient) {
    this.sanityDocId = sanityDocId
    this.s = s
  }

  init = async () => {
    log('info', '____________________SanityUpdate')
    await this.getSanityArtwork()
    this.isLoaded = true
    this.isArtwork = !!this.sanityArtwork
    this.hasShopifyData = !!(
      this.sanityArtwork?.shopify_product_id &&
      this.sanityArtwork?.shopify_handle
    )
    if (!this.hasShopifyData) log('info', `artwork was not synced before`)
  }
  getShopifyProduct = async () => {
    if (this.sanityArtwork?.shopify_product_id && this.hasShopifyData) {
      this.shopifyProduct = await getShopifyProduct(
        this.sanityArtwork.shopify_product_id
      )
      if (!this.shopifyProduct) log('info', `unable to find product on Shopify`)
      if (this.shopifyProduct)
        log(
          'info',
          `Artwork: ${this.sanityArtwork?.name} exists, check if update is needed`
        )
    }
  }

  createShopifyProduct = async () => {
    if (this.sanityArtwork) {
      this.shopifyProduct = await createProduct(this.sanityArtwork, this.s)
    }
    await this.setShopifyChecksum()
    await this.setSanitySyncData()
  }
  updateShopifyProduct = async () => {
    log('info', `Artwork: ${this.sanityArtwork?.name} gets updated`)
    if (this.sanityArtwork) {
      await updateShopifyProduct(this.sanityArtwork)
    }
    await this.setShopifyChecksum()
  }

  setShopifyChecksum = async () => {
    if (!this.shopifyProduct) return
    if (!this.shopifyProduct.id) return
    if (!this.sanityChecksum) return
    setShopifyChecksum(this.shopifyProduct.id, this.sanityChecksum)
  }
  getShopifyChecksum = async () => {
    if (!this.shopifyProduct) return
    if (!this.shopifyProduct.id) return
    this.shopifyChecksum = await getShopifyChecksum(this.shopifyProduct.id)
  }

  getSanityChecksum = () => {
    const dataForChecksum = {
      imageSrc: this.sanityArtwork?.imageSrc,
      name: this.sanityArtwork?.name,
      description: this.sanityArtwork?.description,
      price: this.sanityArtwork?.price,
      availability: this.sanityArtwork?.availability,
    }
    this.sanityChecksum = JSON.stringify(dataForChecksum)
  }

  getSanityArtwork = async () => {
    await waitSomeTime(1000)
    this.sanityArtwork = await getSanityArtwork(this.sanityDocId, this.s)
    this.getSanityChecksum()
  }

  setSanitySyncData = async () => {
    if (!this.shopifyProduct?.id || !this.shopifyProduct?.handle) {
      log('error', 'unable to set Sanity SyncData')
      return
    }
    log('info', 'set Sanity SyncData')
    await setSanitySyncData(
      this.sanityDocId,
      this.shopifyProduct.id,
      this.shopifyProduct.handle,
      this.shopifyProduct.variant_id,
      this.s
    )
  }

  shouldUpdate = async () => {
    await this.getShopifyChecksum()
    console.log(this.shopifyChecksum)
    console.log(this.sanityChecksum)
    return this.sanityChecksum !== this.shopifyChecksum
  }

  run = async () => {
    await this.init()
    if (!this.isArtwork) return null
    if (!this.hasShopifyData) return await this.createShopifyProduct()
    await this.getShopifyProduct()
    if (!this.shopifyProduct) return await this.createShopifyProduct()
    const shouldUpdate = await this.shouldUpdate()
    if (shouldUpdate) {
      await this.updateShopifyProduct()
    }
  }
}
