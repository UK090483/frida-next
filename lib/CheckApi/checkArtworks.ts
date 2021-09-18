import { SanityCheckArtwork } from '@pages/api/check/SanityArtworks'
import { ShopifyCheckArtwork } from '@pages/api/check/ShopifyArtworks'

export const checkArtworks = (
  ShopifyArtworks: ShopifyCheckArtwork[],
  SanityArtworks: SanityCheckArtwork[]
) => {
  type Error = {
    [k: string]: any
    shopify_product_id: number
    shopify_variant_id?: number
    sanityArtwork: SanityCheckArtwork
  }
  const errors: Error[] = []
  const duplicates = []
  const fullConnected = []
  const waste = []
  const sanityUnconnected = []
  //   const shopifyProducts = []

  for (const iterator of ShopifyArtworks) {
    const artworks = SanityArtworks.filter(
      (i) => i.shopify_product_id === iterator.id + ''
    )
    if (artworks.length > 1) {
      duplicates.push({
        shopify_product_id: iterator.id,
        shopify_title: iterator.title,
        sanityArtwork: artworks,
      })
    }
    if (artworks.length === 1) {
      const variant_id =
        iterator.variants && iterator.variants[0] && iterator.variants[0].id
      const err = checkErrors(iterator, artworks[0])

      if (err) {
        errors.push({
          error: err,
          shopify_product_id: iterator.id,
          shopify_variant_id: variant_id,
          shopify_title: iterator.title,
          shopifyArtwork: iterator,
          sanityArtwork: artworks[0],
        })
      } else {
        fullConnected.push({
          shopify_product_id: iterator.id,
          shopify_variant_id: variant_id,
          shopify_title: iterator.title,
          sanityArtwork: artworks[0],
        })
      }
    }
    if (artworks.length === 0) {
      if (iterator.product_type === 'artwork') {
        waste.push({
          shopify_product_id: iterator.id,
          shopify_title: iterator.title,
          sanityArtwork: artworks,
        })
      }
    }
  }

  for (const i of SanityArtworks) {
    const res = fullConnected.filter((s) => s.sanityArtwork._id === i._id)
    const err = errors.filter((e) => e.sanityArtwork._id === i._id)

    if (res.length === 0 && err.length === 0) {
      sanityUnconnected.push(i)
    }
  }

  return { errors, duplicates, sanityUnconnected, waste, fullConnected }
}

const checkErrors = (
  shopifyArtwork: ShopifyCheckArtwork,
  sanityArtwork: SanityCheckArtwork
) => {
  const error: string[] = []
  const variant_id =
    shopifyArtwork.variants &&
    shopifyArtwork.variants[0] &&
    shopifyArtwork.variants[0].id

  if (variant_id && variant_id + '' !== sanityArtwork.shopify_variant_id) {
    error.push('variant_id not equal')
  }

  return error.length > 0 ? error : null
}
