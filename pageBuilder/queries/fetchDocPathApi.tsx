import { getSanityClient } from 'lib/Sanity/sanity.server'
import { GetStaticPathsResult } from 'next'

export const getAllDocSlugs: (
  doc: string,
  args?: string
) => Promise<null | { slug: string }[]> = async (doc, args = '') => {
  return await getSanityClient().fetch(
    `*[_type == "${doc}" ${args}]{ "slug": slug.current }`
  )
}

export const getAllDocPathsCached = async (doc: string, args?: string) => {
  const allPages = await getAllDocSlugs(doc, args)
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
    fallback: 'blocking',
  } as GetStaticPathsResult
}
