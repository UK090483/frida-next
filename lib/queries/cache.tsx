import { getSanityClient } from '@lib/sanity.server'
import axios from 'axios'
import { artistCardQuery, ArtistCardResult } from 'PageTypes/Artist/ArtistCard'
import {
  artworkCardQuery,
  ArtworkCardResult,
} from 'PageTypes/Artwork/ArtworkCard'
// import { accessCache } from 'next-build-cache'
import { body, PageBodyResult } from '../../pageBuilder/pageBuilderQueries'
import { defaultFooterId } from 'shared'

// export const cache = accessCache('public/build.cache.json')

export const cache = { get: (_a: any) => null, put: (_a: any, _b: any) => null }

const cashQuery = `
{
  'artworks':*[_type=='artwork' && (defined(shopify_variant_id) || isNft) ]{
    ${artworkCardQuery}
  },
  'artists':*[_type=='artist'&& defined(slug.current)]{
    ${artistCardQuery}
  },
  'site':{
    'footer':*[_type=='footer' && _id== '${defaultFooterId}' ][0]{${body}},
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
      'footerItems': footerNav[]{
        label,
        label_en,
        link,
        'internalLink':internalLink->{'type':_type, 'slug':slug.current},
      },
      'agbSite':agbSite->slug.current,
      'imprintSite':imprintSite->slug.current,
    }
  }
}
`

export const siteQuery = `
'site':{
  'footer':*[_type=='footer' && _id == '${defaultFooterId}' ][0]{${body}},
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
    },
    'footerItems': footerNav[]{
      label,
      label_en,
      link,
      'internalLink':internalLink->{'type':_type, 'slug':slug.current},
    },
    'agbSite':agbSite->slug.current,
    'imprintSite':imprintSite->slug.current,
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
  navigation: null | {
    items: {
      label: string
      label_en: string | null
      link: string | null
      internalLink: string | null
    }[]

    footerItems?: {
      label?: string
      label_en?: string | null
      link?: string | null
      internalLink?: { type: string; slug: string }
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

class SiteCash {
  url =
    process.env.NODE_ENV === 'production'
      ? 'https://frida-next.vercel.app/build.cache.json'
      : 'http://localhost:3000/build.cache.json'

  getData = async (isPreview = false) => {
    if (isPreview) {
      return await this.getPreviewCache()
    }
    return await this.getDataCashed()
  }

  getDataCashed = async () => {
    const res = await cache.get(siteCacheKey)
    if (!res) {
      const siteResult = await this.getPreparedData()
      console.log(`build Cache with ${siteResult.artworks.length} Artworks`)
      await cache.put(siteCacheKey, siteResult)
      return siteResult as CacheResult | null
    }
    return res as CacheResult | null
  }

  getPreviewCache = async () => {
    const res = await axios.get(this.url)
    if (res.data && res.data[siteCacheKey] && res.data[siteCacheKey].data) {
      return res.data[siteCacheKey].data
    }
  }

  getPreparedData = async () => {
    const siteResult = await getSanityClient().fetch(cashQuery)
    if (siteResult.artworks && Array.isArray(siteResult.artworks)) {
      siteResult.artworks = this.shuffle(siteResult.artworks)
    }
    return siteResult ? siteResult : null
  }
  shuffle = (array: unknown[]) => {
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
}

export const buildCache = new SiteCash()
