import { SanityClient } from '@sanity/client'
import { log } from './logging'
import SanityArtwork from './SanityArtwork'
import ShopifyArtwork from './ShopifyArtwork'

export default class SanityEraseHandler {
  sanityArtwork: SanityArtwork
  sanityDocId: string
  sanityClient: SanityClient
  shopifyArtwork = new ShopifyArtwork()

  constructor(sanityDocId: string, sanityClient: SanityClient) {
    this.sanityDocId = sanityDocId
    this.sanityClient = sanityClient
    this.sanityArtwork = new SanityArtwork(sanityDocId, sanityClient)
  }

  shouldRun = async () => {
    log('info', '____________________SanityErase')

    if (!(await this.sanityArtwork.getData())) {
      log('info', 'not artwork data, done!!!')
      return false
    }
    log('info', 'start syncing')
    return true
  }

  shouldErase = async () => {
    const sanityData = await this.sanityArtwork.getData()
    return !!sanityData
  }

  draftShopifyArtwork = async () => {
    log('info', '___Draft Artwork')
    const sanityData = await this.sanityArtwork.getData()

    if (sanityData && sanityData.shopify_product_id) {
      this.shopifyArtwork.init(sanityData.shopify_product_id)
      await this.shopifyArtwork.draftArtwork(sanityData.shopify_product_id)
      log('info', '___Draft Artwork done !')
    }
    return
  }

  run = async () => {
    const shouldRun = await this.shouldRun()
    if (!shouldRun) return

    if (await this.shouldErase()) {
      await this.draftShopifyArtwork()
    }

    // if (await this.shouldCreate()) {
    //   return await this.createShopifyArtwork()
    // }
    // if (await this.shouldUpdate()) {
    //   return await this.updateShopifyArtwork()
    // }
  }
}
