import type { SanityClient } from '@sanity/client'
import { imageBuilder } from '../sanity'
import axios from 'axios'

import type { Logger } from './logger'
const { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID, SANITY_API_TOKEN } =
  process.env

export type SanityProduct = {
  _id: string
  name: string
  price: number
  slug: string
  imageSrc: null | string
  shopify_product_id?: string
  shopify_variant_id?: string
  shopify_handle?: string
  description?: string
  availability?: 'sold' | 'availabil'
}

export type SanityArtworkData = {
  _id: string
  name: string
  price: number
  slug: string
  imageSrc: null | string
  shopify_product_id?: string
  shopify_handle?: string
  shopify_variant_id?: string
  description?: string
  availability?: 'sold' | 'availabil'
  isNft?: boolean
}

export default class SanityArtwork {
  sanityClient: SanityClient
  id: string
  data: SanityArtworkData | null = null
  errMsg: string
  loaded = false
  isDraft = false
  logger: Logger

  constructor(sanityDocId: string, sanityClient: SanityClient, logger: Logger) {
    this.id = sanityDocId
    this.sanityClient = sanityClient
    this.errMsg = `SanityArtwork Error:item with id ${this.id}`
    this.logger = logger
  }

  init = async () => {
    await this._getData()
  }

  fetch = async () => {
    try {
      const res = await axios.get(
        `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/doc/${SANITY_PROJECT_DATASET}/${this.id}`,
        { headers: { Authorization: `Bearer ${SANITY_API_TOKEN}` } }
      )
      const doc = res?.data?.documents && res?.data?.documents[0]

      this.loaded = true
      if (!doc) return null
      if (this.shouldIgnore(doc)) {
        this.logger('info', `ignore`)
        return null
      }

      if (doc.image?.asset) {
        doc.imageSrc = imageBuilder.image(doc.image.asset).width(600).url()
      }
      if (!doc.description) {
        doc.description = ''
      }
      return doc as SanityProduct
    } catch (error) {
      this.loaded = true
      this.logger('error', `${this.errMsg} could not be fetched`)
      return null
    }
  }

  shouldIgnore = (doc: any) => {
    if (doc._type !== 'artwork') {
      this.logger('info', `type is:${doc._type}`)
      return true
    }
    if (doc.isNft) {
      this.logger('info', `is Nft Artwork`)
      return true
    }

    return false
  }

  _getData = async () => {
    if (!this.data) {
      this.data = await this.fetch()
    }
    if (!this.data) {
      this.id = `drafts.${this.id}`
      this.data = await this.fetch()
      if (this.data) this.isDraft = true
    }
    return this.data
  }

  _isLoadedCheck = () => {
    if (!this.loaded) {
      throw `${this.errMsg} should be loaded before calling methods of SanityArtwork  `
    }
  }

  hasSyncData = () => {
    this._isLoadedCheck()
    return !!(
      this.data?.shopify_product_id &&
      this.data?.shopify_variant_id &&
      this.data?.shopify_handle
    )
  }

  getShopifyId = () => {
    return this.data?.shopify_product_id
  }

  setSyncData = async (props: {
    shopify_product_id: string
    shopify_handle: string
    shopify_variant_id: string
  }) => {
    this.logger('info', `setting syncData in Sanity`)
    await this.sanityClient.patch(this.id).set(props).commit()
  }

  getCheckSum = async () => {
    if (!this.data) {
      this.logger('error', 'no data for checksum')
      return
    }
    return JSON.stringify({
      isDraft: this.isDraft,
      imageSrc: this.data.imageSrc,
      name: this.data.name,
      description: this.data.description,
      price: this.data.price,
      availability: this.data.availability,
    })
  }
}
