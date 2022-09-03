import { SanityClient } from '@sanity/client'
import { SanityProduct } from './SanityArtwork'

const handleSold = async (
  shopifyId: number,
  sold: boolean,
  sanityClient: SanityClient
) => {
  console.log({ shopifyId, sold })

  const artworks = await sanityClient.fetch<
    Pick<SanityProduct, '_id' | 'availability'>[]
  >(`*[ shopify_product_id == '${shopifyId}']{_id,availability}`)

  const availabilityShould: SanityProduct['availability'] = sold
    ? 'sold'
    : 'availabil'

  for (const artwork of artworks) {
    if (artwork.availability !== availabilityShould) {
      await sanityClient
        .patch(artwork._id)
        .set({
          availability: availabilityShould,
        })
        .commit()
    }
  }
}

export default handleSold
