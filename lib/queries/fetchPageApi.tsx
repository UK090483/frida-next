import { getSanityClient } from '@lib/sanity'
import { ArtistCardResult } from 'contentTypes/Artist/ArtistCard'
import { ArtworksGalleryResult } from 'pageBuilder/Blocks/ArtworkBlock'
import { cache, getSiteCache } from './cache'
import { PageBodyResult } from './pageBuilderQueries'

export const fetchPageWithCache = async (query: string, slug: string) => {
  let pageData
  if (process.env.NODE_ENV === 'development') {
    pageData = (await cache.get(slug)) as any

    if (!pageData) {
      console.log(`page ${slug} gets cached`)
      pageData = (await getSanityClient().fetch(query, { slug: slug })) as any

      await cache.put(slug, pageData)
    } else {
      console.log(`page ${slug} from cache`)
    }
  } else {
    pageData = (await getSanityClient().fetch(query, { slug: slug })) as any
  }

  const SiteCache = await getSiteCache()

  if (!pageData || !SiteCache) return

  if (pageData.site) {
    pageData.site = SiteCache?.site
  }

  if (pageData.content) {
    pageData.content = await handleBodyQueries(pageData.content)
  }

  return pageData
}

const handleBodyQueries = async (body: PageBodyResult) => {
  const SiteCache = await getSiteCache()
  const artworks = SiteCache?.artworks ? SiteCache?.artworks : []
  const artists = SiteCache?.artists ? SiteCache?.artists : []

  return body.map((item) => {
    if (item._type === 'artworks') {
      const _item = item
      if (_item.count === 'all') return { ...item, items: [...artworks] }
      return { ..._item, items: [...getRandom(artworks, 20)] }
    }
    if (item._type === 'artists') {
      const _item = item
      if (_item.type === 'masonry') return { ...item, items: [...artists] }
      return { ..._item, items: [...getRandom(artists, 20)] }
    }
    return item
  })
}

function getRandom(arr: any[], n: number) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len)
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available')
  while (n--) {
    var x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}
