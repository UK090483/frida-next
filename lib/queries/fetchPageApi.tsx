import { getSanityClient } from '@lib/sanity.server'
// import { cache, buildCache } from './cache'
// import type { PageBodyResult } from '../../pageBuilder/pageBuilderQueries'
import type { FridaPreviewData } from '@pages/api/preview'
// import { shouldCash } from '@lib/constants'
// import { ArtworkCardResult } from 'PageTypes/Artwork/ArtworkCard'

export const fetchPageWithCache = async (
  query: string,
  slug: string,
  preview: boolean,
  previewData?: FridaPreviewData
) => {
  if (preview) {
    console.log('preview Active')
  }

  if (preview && (!previewData || !previewData?.token)) {
    console.log('preview token is missing')
  }

  const pageData = await getSanityClient({
    active: !!preview,
    token: previewData?.token,
  }).fetch(query, {
    slug: slug,
  })

  // const SiteCache = await buildCache.getData(preview)

  // if (!pageData || !SiteCache) return

  // if (pageData.site) {
  //   pageData.site = SiteCache?.site
  // }

  // if (pageData.content) {
  //   pageData.content = await handleBodyQueries(pageData.content, preview)
  // }

  return pageData
}

// const handleBodyQueries = async (body: PageBodyResult, isPreview = false) => {
//   const SiteCache = await buildCache.getData(isPreview)
//   const artworks: ArtworkCardResult[] = SiteCache?.artworks
//     ? SiteCache?.artworks
//     : []
//   const artists = SiteCache?.artists ? SiteCache?.artists : []

//   return body.map((item) => {
//     if (item._type === 'artworks') {
//       if (item.count === 'all') return { ...item, items: [...artworks] }
//       if (item.order && item.order.includes('lastEdited')) {
//         return {
//           ...item,
//           items: [...filterLastUpdatetArtworks(artworks).slice(0, 20)],
//         }
//       }

//       return { ...item, items: [...getRandom(artworks, 20)] }
//     }
//     if (item._type === 'artists') {
//       const _item = item
//       if (_item.type === 'masonry') return { ...item, items: [...artists] }
//       return { ..._item, items: [...getRandom(artists, 20)] }
//     }
//     return item
//   })
// }

// function filterLastUpdatetArtworks(artworks: ArtworkCardResult[]) {
//   try {
//     return artworks
//       .sort((a, b) => {
//         const dateA = new Date(a._updatedAt)
//         const dateB = new Date(b._updatedAt)
//         return dateA.getTime() - dateB.getTime()
//       })
//       .reverse()
//   } catch (error) {
//     return artworks
//   }
// }

// function getRandom(arr: unknown[], n: number) {
//   const result = new Array(n)
//   let len = arr.length
//   const taken = new Array(len)
//   if (n > len)
//     throw new RangeError('getRandom: more elements taken than available')
//   while (n--) {
//     const x = Math.floor(Math.random() * len)
//     result[n] = arr[x in taken ? taken[x] : x]
//     taken[x] = --len in taken ? taken[len] : len
//   }
//   return result
// }
