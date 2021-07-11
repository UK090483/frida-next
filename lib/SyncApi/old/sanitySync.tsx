import { SanityClient } from '@sanity/client'

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
shopify_handle,
description,
availability
`

export const getSanityArtwork = async (id: string, s: SanityClient) => {
  try {
    const res = (await await s.fetch(
      `*[_type=='artwork' && _id== $id][0]{
     ${sanitySyncArtworkQuery}
      }`,
      {
        id: id,
      }
    )) as SanityProduct
    return res._id ? res : null
  } catch (error) {
    console.error(
      `handleUpdate Error:item with id ${id} could not be found handleUpdate`
    )
    return null
  }
}

export const setSanitySyncData = async (
  sanityDocId: string,
  shopify_product_id: string,
  shopify_handle: string,
  shopify_variant_id: string,
  s: SanityClient
) => {
  await s
    .patch(sanityDocId)
    .set({
      shopify_product_id,
      shopify_variant_id,
      shopify_handle,
    })
    .commit()
}
export const getSanityArtworkCheckSum = async (product: SanityProduct) => {
  return JSON.stringify(product)
}

export class SanityArtwork {
  sanityClient: SanityClient
  id: string
  data: SanityArtworkData | null = null
  errMsg: string
  loaded = false

  constructor(sanityDocId: string, sanityClient: SanityClient) {
    this.id = sanityDocId
    this.sanityClient = sanityClient
    this.errMsg = `SanityArtwork Error:item with id ${this.id}`
  }

  fetch = async () => {
    try {
      const res = await await this.sanityClient.fetch<SanityProduct | null>(
        `*[_type=='artwork' && _id== $id][0]{
       ${sanitySyncArtworkQuery}
        }`,
        {
          id: this.id,
        }
      )

      if (!res) {
        console.error(`${this.errMsg} could not be found `)
      }
      this.loaded = true
      return res && res._id ? res : null
    } catch (error) {
      this.loaded = true
      console.error(`${this.errMsg} could not be fetched`)
      return null
    }
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

  setSyncData = async (
    shopify_product_id: string,
    shopify_handle: string,
    shopify_variant_id: string
  ) => {
    await this.sanityClient
      .patch(this.id)
      .set({
        shopify_product_id,
        shopify_variant_id,
        shopify_handle,
      })
      .commit()
  }

  getCheckSum = async () => {
    return JSON.stringify(this.setSyncData)
  }
}
