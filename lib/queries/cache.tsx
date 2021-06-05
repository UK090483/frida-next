import { shouldCashSite } from '@lib/constants'
import { getSanityClient } from '@lib/sanity'
import {
  artistCardQuery,
  ArtistCardResult,
} from 'contentTypes/Artist/ArtistCard'
import {
  artworkCardQuery,
  ArtworkCardResult,
} from 'contentTypes/Artwork/ArtworkCard'
import { accessCache } from 'next-build-cache'
import { body, PageBodyResult } from '../../pageBuilder/pageBuilderQueries'

export const cache = accessCache('public/build.cache.json')

const cashQuery = `
{
  'artworks':*[_type=='artwork' && defined(shopify_variant_id )]{
    ${artworkCardQuery}
  },
  'artists':*[_type=='artist'&& defined(slug.current)]{
    ${artistCardQuery}
  },
  'site':{
    'footer':*[_type=='footer' && _id== '3667a872-9775-477c-b33b-09370c28524f' ][0]{${body}},
    "seo": *[_type == "seoSettings"][0]{
      siteTitle,
      metaTitle,
      metaDesc,
      shareTitle,
      shareDesc,
      shareGraphic
    },
    'navigation':*[_type == "navigation"][0]{
      'items': item[]{
        label,
        label_en,
        link,
        'internalLink':internalLink->slug.current
      },
      'agbSite':agbSite->slug.current,
      'imprintSite':imprintSite->slug.current,
    }
  }
}
`

export type SiteResult = {
  footer: {
    content: PageBodyResult
  }
  seo: {
    siteTitle: string | null
    metaTitle: string | null
    metaDesc: string | null
    shareTitle: string | null
    shareDesc: string | null
    shareGraphic: any | null
  }
  navigation: {
    items: {
      label: string
      label_en: string | null
      link: string | null
      internalLink: string | null
    }[]
    agbSite?: string | null
    imprintSite?: string | null
  }
}

export type CacheResult = {
  artworks: ArtworkCardResult[]
  artists: ArtistCardResult[]
  site: SiteResult
}

const siteCacheKey = 'siteCache'

// class siteCash {
//   getData = async () => {
//     if (shouldCash) {
//       return this.getDataCashed()
//     }

//     return this.getData()
//   }

//   getDataCashed = async () => {
//     const res = await cache.get(siteCacheKey)
//     if (!res) {
//       const siteResult = await this.getPreparedData()
//       console.log(`build Cache with ${siteResult.artworks.length} Artworks`)
//       await cache.put(siteCacheKey, siteResult)
//       return siteResult
//     }
//     return res
//   }

//   getPreparedData = async () => {
//     const siteResult = await getSanityClient().fetch(cashQuery)
//     if (siteResult.artworks && Array.isArray(siteResult.artworks)) {
//       siteResult.artworks = shuffle(siteResult.artworks)
//     }
//     return siteResult ? siteResult.artworks : null
//   }
// }

export const getSiteCache: () => Promise<undefined | CacheResult> =
  async () => {
    let site
    if (shouldCashSite) {
      site = (await cache.get(siteCacheKey)) as any

      if (!site) {
        const siteResult = await getSanityClient().fetch(cashQuery)

        if (siteResult.artworks && Array.isArray(siteResult.artworks)) {
          siteResult.artworks = shuffle(siteResult.artworks)
        }

        console.log(`build Cache with ${siteResult.artworks.length} Artworks`)
        await cache.put(siteCacheKey, siteResult)
        site = siteResult
      } else {
        console.log('site Data from Cache')
      }
    } else {
      const siteResult = await getSanityClient().fetch(cashQuery)

      if (siteResult.artworks && Array.isArray(siteResult.artworks)) {
        siteResult.artworks = shuffle(siteResult.artworks)
      }
      site = siteResult
    }

    return site ? site : undefined
  }

function shuffle(array: any[]) {
  let m = array.length,
    t,
    i
  while (m) {
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}
