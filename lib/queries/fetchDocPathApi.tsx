import { shouldCash } from '@lib/constants'
import { getSanityClient } from '@lib/sanity.server'
import { cache } from './cache'

export const getAllDocSlugs: (
  doc: string
) => Promise<null | { slug: string }[]> = async (doc) => {
  return await getSanityClient().fetch(
    `*[_type == "${doc}"]{ "slug": slug.current }`
  )
}

export const getAllDocPathsCached = async (doc: string) => {
  let allPages
  if (shouldCash) {
    const key = `docPaths${doc}`
    allPages = await cache.get(key)
    if (!allPages) {
      console.log(`docPath ${doc} gets cached`)
      allPages = await getAllDocSlugs(doc)
      await cache.put(key, allPages)
    } else {
      console.log(`docPath ${doc} from cache`)
    }
  } else {
    allPages = await getAllDocSlugs(doc)
  }

  if (!allPages) return { paths: [], fallback: true }
  if (!Array.isArray(allPages)) return { paths: [], fallback: true }

  return {
    paths:
      allPages.reduce((acc, page) => {
        if (!page.slug) return [...acc]
        const slugs = page.slug.split('/').filter((e: string) => e)

        return [
          ...acc,
          {
            params: {
              slug: slugs,
            },
            locale: 'de',
          },
          {
            params: {
              slug: slugs,
            },
            locale: 'en',
          },
        ]
      }, [] as any[]) || [],
    fallback: false,
  }
}
