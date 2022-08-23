import { SanityClient } from '@sanity/client'
import { log } from './logging'
import SanityArtwork from './SanityArtwork'
import ShopifyArtwork from './Shopify/ShopifyArtwork'
import Shopify from 'shopify-api-node'

export default class SanitySyncHandler {
  sanityArtwork: SanityArtwork
  sanityDocId: string
  sanityClient: SanityClient
  shopifyClient: Shopify
  shopifyArtwork: ShopifyArtwork
  action: 'update' | 'create' | 'unPublish' | null = null

  constructor(
    sanityDocId: string,
    sanityClient: SanityClient,
    shopifyClient: Shopify
  ) {
    this.shopifyArtwork = new ShopifyArtwork({ shopifyClient })
    this.sanityDocId = sanityDocId
    this.sanityClient = sanityClient
    this.sanityArtwork = new SanityArtwork(sanityDocId, sanityClient)
    this.shopifyClient = shopifyClient
  }

  getAction = async () => {
    await this.sanityArtwork.init()
    if (!this.sanityArtwork.data) return
    if (await this.shouldCreate()) return 'create'
    if (await this.shouldUpdate()) return 'update'
  }

  shouldCreate = async () => {
    const shopify_product_id = this.sanityArtwork.getShopifyId()
    if (!this.sanityArtwork.hasSyncData() || !shopify_product_id) {
      log('info', 'was not synced before')
      return true
    }
    this.shopifyArtwork.init(shopify_product_id)
    if (!(await this.shopifyArtwork.getCheckSum())) {
      log('info', 'no corresponding found on shopify')
      return true
    }
  }

  shouldUpdate = async () => {
    const shopifyChecksum = await this.shopifyArtwork.getCheckSum()
    const sanityChecksum = await this.sanityArtwork.getCheckSum()
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
    const data = await this.sanityArtwork._getData()
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
    const sanityData = await this.sanityArtwork._getData()
    const checksum = await this.sanityArtwork.getCheckSum()

    if (sanityData && sanityData.shopify_product_id && checksum) {
      const syncData = await this.shopifyArtwork.updateArtwork(
        parseInt(sanityData.shopify_product_id),
        sanityData,
        checksum,
        this.sanityArtwork.isDraft
      )
      if (!syncData) {
        return null
      }
      await this.sanityArtwork.setSyncData(syncData)
      log('info', '___Update Artwork done !')
      return syncData
    }
    return
  }

  run = async () => {
    log('info', '________SanitySync startup')
    const action = await this.getAction()
    if (!action) return
    if (action === 'create') return await this.createShopifyArtwork()
    if (action === 'update') return await this.updateShopifyArtwork()
  }
}
