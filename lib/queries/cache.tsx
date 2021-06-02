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
import { body, PageBodyResult } from './pageBuilderQueries'

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
    'footer':*[_type=='footer']{${body}},
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
  }
}}
}
`

export type SiteResult = {
  footer: {
    content: PageBodyResult
  }[]
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
  }
}

export type CacheResult = {
  artworks: ArtworkCardResult[]
  artists: ArtistCardResult[]
  site: SiteResult
}

const siteCacheKey = 'siteCache'

export const getSiteCache: () => Promise<undefined | CacheResult> =
  async () => {
    let site = (await cache.get(siteCacheKey)) as any
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
    return site ? site : undefined
  }

function shuffle(array: any[]) {
  var m = array.length,
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
