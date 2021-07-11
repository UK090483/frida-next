import { SanityClient } from '@sanity/client'
import { imageBuilder } from '@lib/sanity'
import axios from 'axios'
const { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID, SANITY_API_TOKEN } =
  process.env

export type SanityProduct = {
  _id: string
  name: string
  price: number
  slug: string
  imageSrc: null | string
  shopify_product_id?: string
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
}

export const sanitySyncArtworkQuery = `
_id,
name,
price,
'slug':slug.current,
'imageSrc':image.asset->url,
shopify_product_id,
shopify_variant_id,
shopify_handle,
description,
availability
`
export default class SanityArtwork {
  sanityClient: SanityClient
  id: string
  private data: SanityArtworkData | null = null
  errMsg: string
  loaded = false

  constructor(sanityDocId: string, sanityClient: SanityClient) {
    this.id = sanityDocId
    this.sanityClient = sanityClient
    this.errMsg = `SanityArtwork Error:item with id ${this.id}`
  }

  fetch = async () => {
    try {
      const res = await axios({
        url: `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/doc/${SANITY_PROJECT_DATASET}/${this.id}`,
        headers: { Authorization: `Bearer ${SANITY_API_TOKEN}` },
      })

      const doc = res?.data?.documents && res?.data?.documents[0]
      this.loaded = true
      if (!doc) return null
      if (doc._type !== 'artwork') return null

      if (doc.image.asset) {
        doc.imageSrc = imageBuilder.image(doc.image.asset).url()
      }
      if (!doc.description) {
        doc.description = ''
      }

      return doc as SanityProduct
    } catch (error) {
      this.loaded = true

      console.error(`${this.errMsg} could not be fetched`)
      return null
    }

    //   try {
    //     const res = await await this.sanityClient.fetch<SanityProduct | null>(
    //       `*[_type=='artwork' && _id== $id][0]{
    //        ${sanitySyncArtworkQuery}
    //         }`,
    //       {
    //         id: this.id,
    //       }
    //     )

    //     if (!res) {
    //       console.error(`${this.errMsg} could not be found `)
    //     }
    //     this.loaded = true
    //     return res && res._id ? res : null
    //   } catch (error) {
    //     this.loaded = true

    //     return null
    //   }
  }

  getData = async () => {
    if (!this.data) {
      this.data = await this.fetch()
    }
    return this.data
  }

  shouldSync = () => {
    if (!this.loaded) {
      throw `${this.errMsg} should be loaded before shouldSync Check `
    }
    if (!this.data) return false
    if (!this.data.shopify_handle || !this.data.shopify_product_id) {
      return true
    }
    return false
  }

  hasSyncData = () => {
    if (!this.loaded) {
      throw `${this.errMsg} should be loaded before shouldSync Check `
    }
    return !!(
      this.data?.shopify_product_id &&
      this.data?.shopify_variant_id &&
      this.data?.shopify_handle
    )
  }

  setSyncData = async (props: {
    shopify_product_id: string
    shopify_handle: string
    shopify_variant_id: string
  }) => {
    await this.sanityClient.patch(this.id).set(props).commit()
  }

  getCheckSum = async () => {
    if (!this.data) {
      console.log('no data for checksum')
      return
    }

    return JSON.stringify({
      imageSrc: this.data.imageSrc,
      name: this.data.name,
      description: this.data.description,
      price: this.data.price,
      availability: this.data.availability,
    })
  }
}
