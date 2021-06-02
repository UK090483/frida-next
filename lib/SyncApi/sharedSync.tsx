import { log } from './logging'
import { SanityProduct } from './sanitySync'
import { ShopifyProduct } from './shopifySync'

export const compareArtworkData = (
  shopifyArtwork: ShopifyProduct,
  sanityArtwork: SanityProduct
) => {
  log('info', ' compare Artwork')
}
