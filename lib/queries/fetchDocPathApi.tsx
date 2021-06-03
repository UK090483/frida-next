import { getAllDocSlugs } from '@lib/api'
import { cache } from './cache'

export const getAllDocPathsCached = async (doc: string) => {
  const key = `docPaths${doc}`
  let allPages = (await cache.get(key)) as any

  if (!allPages) {
    console.log(`docPath ${doc} gets cached`)
    allPages = await getAllDocSlugs(doc)
    await cache.put(key, allPages)
  } else {
    console.log(`docPath ${doc} from cache`)
  }

  if (!allPages) return { paths: [], fallback: true }
  if (!Array.isArray(allPages)) return { paths: [], fallback: true }

  return {
    paths:
      allPages.reduce((acc, page) => {
        if (!page.slug) return [...acc]
        let slugs = page.slug.split('/').filter((e: string) => e)

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
