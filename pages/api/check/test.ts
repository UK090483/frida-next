import { checkArtworks } from '@lib/CheckApi/checkArtworks'
// import type { Error } from '@lib/CheckApi/checkArtworks'
import { NextApiRequest, NextApiResponse } from 'next'
import type { FetchSanityArtworkResult } from './SanityArtworks'
import type { FetchShopifyResult } from './ShopifyArtworks'
// import { previewClient } from '@lib/sanity.server'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { SanityArtworks } = (await (
    await fetch('http://localhost:3000/api/check/SanityArtworks')
  ).json()) as FetchSanityArtworkResult

  const { ShopifyArtworks } = (await (
    await fetch('http://localhost:3000/api/check/ShopifyArtworks')
  ).json()) as FetchShopifyResult

  const { errors, duplicates, sanityUnconnected, waste, fullConnected } =
    checkArtworks(ShopifyArtworks, SanityArtworks)

  // for (const iterator of errors) {
  //   handleArtworkVariantIdError(iterator)
  // }

  return res.json({
    SanityArtworks,
    fullConnected,
    errors,
    sanityUnconnected,
    duplicates,
    waste,
  })
}

// const handleArtworkVariantIdError = (error: Error) => {
//   const sanity = previewClient
//   const sanityDocId = error.sanityArtwork._id

//   const shopify_variant_id = error.shopify_variant_id + ''
//   if (!sanity) return

//   console.log('start ' + sanityDocId)
//   sanity
//     .patch(sanityDocId) // Document ID to patch
//     .set({ shopify_variant_id }) // Shallow merge
//     .commit() // Perform the patch and return a promise
//     .then(() => {
//       console.log('done ' + sanityDocId)

//       // console.log(updatedBike)
//     })
//     .catch((err) => {
//       console.error('Oh no, the update failed: ', err.message)
//     })
// }
