import { SanityClient } from '@sanity/client'
import { log } from './logging'
import SanityArtwork from './SanityArtwork'
import ShopifyArtwork from './ShopifyArtwork'

export default class SanityUpdateHandler {
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
    log('info', '____________________SanityUpdate')

    if (!(await this.sanityArtwork.getData())) {
      log('info', 'not artwork data, done!!!')
      return false
    }
    log('info', 'start syncing')
    return true
  }
  shouldCreate = async () => {
    const sanityData = await this.sanityArtwork.getData()

    if (!this.sanityArtwork.hasSyncData() || !sanityData?.shopify_product_id) {
      log('info', 'was not synced before')
      return true
    }

    this.shopifyArtwork.init(sanityData.shopify_product_id)
    if (!(await this.shopifyArtwork.getCheckSum())) {
      log('info', 'no corresponding found on shopify')
      return true
    }
  }
  shouldUpdate = async () => {
    const shopifyChecksum = await this.shopifyArtwork.getCheckSum()
    const sanityChecksum = await this.sanityArtwork.getCheckSum()
    console.log(shopifyChecksum)
    console.log(sanityChecksum)
    const hasChanged = sanityChecksum !== shopifyChecksum
    if (!hasChanged) {
      log('info', 'checksum is equal, sync done!')
      return false
    }
    log('info', 'checksum is not equal')
    return true
  }

  createShopifyArtwork = async () => {
    log('info', '___Create Artwork')
    const checksum = await this.sanityArtwork.getCheckSum()
    const data = await this.sanityArtwork.getData()
    if (!checksum || !data) {
      console.log('unable to create checksum or data')
      return
    }

    const createdProduct = await this.shopifyArtwork.createArtwork(
      data,
      checksum
    )

    if (!createdProduct) {
      console.log('no Product created')
      return
    }
    await this.sanityArtwork.setSyncData(createdProduct)
  }

  updateShopifyArtwork = async () => {
    log('info', '___Update Artwork')
    const sanityData = await this.sanityArtwork.getData()
    const checksum = await this.sanityArtwork.getCheckSum()
    if (sanityData && sanityData.shopify_product_id && checksum) {
      await this.shopifyArtwork.updateArtwork(
        sanityData.shopify_product_id,
        sanityData,
        checksum
      )
      log('info', '___Update Artwork done !')
    }
    return
  }

  run = async () => {
    const shouldRun = await this.shouldRun()
    if (!shouldRun) return

    if (await this.shouldCreate()) {
      return await this.createShopifyArtwork()
    }

    if (await this.shouldUpdate()) {
      return await this.updateShopifyArtwork()
    }
  }
}
