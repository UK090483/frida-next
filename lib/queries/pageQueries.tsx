import { getSanityClient } from '@lib/sanity'
import { FridaColors } from 'types'
import { PageBodyResult, body } from './pageBuilderQueries'

import fetch from 'isomorphic-fetch'

const navigation = `
'navigation':*[_type == "navigation"][0]{
  'items': item[]{
    label,
    label_en,
    link,
    'internalLink':internalLink->slug.current
  }
}
`
export type NavigationResult = {
  items: {
    label: string
    label_en: string | null
    link: string | null
    internalLink: string | null
  }[]
}

const seo = `
"seo": *[_type == "seoSettings"][0]{
  siteTitle,
  metaTitle,
  metaDesc,
  shareTitle,
  shareDesc,
  shareGraphic
}
`

export type SeoResult = {
  siteTitle: string | null
  metaTitle: string | null
  metaDesc: string | null
  shareTitle: string | null
  shareDesc: string | null
  shareGraphic: any | null
}
export const site = `
'site':{
  ${navigation}
  ,
  ${seo}
}
`
export type SiteResult = {
  seo: SeoResult
  navigation: NavigationResult
}

export const page = `
...,
'slug':slug.current,
${body}
${site}
`

export type PageResult = {
  content: PageBodyResult
  title?: string
  title_en?: string
  slug: null | string
  pageHeader?: null | {
    initialPageTitleColor: FridaColors
    hideMenu?: null | boolean
    withOutHomeLink?: null | boolean
  }
  site: SiteResult
}

export async function getIndexPage(pageData: string, preview: any) {
  const query = `*[_type == 'indexPage'][0]{
      ${page}
    }
  `
  const data = await getSanityClient(preview).fetch(query)
  return data
}

export const getPage: (
  slug: string,
  preview: any
) => Promise<null | PageResult> = async (slug: string, preview: any) => {
  const slugs = [`/${slug}`, slug, `/${slug}/`]

  const query = `
        *[(_type == "page" || _type == "indexPage") && slug.current in ${JSON.stringify(
          slugs
        )}][0]{
         ${page}
        }
      `
  const data = await getSanityClient(preview).fetch(query)
  return data
}

export const extraData = async (data: any) => {
  console.log('run extra data')
  const _data = { ...data }
  if (data.content) {
    _data.content = await Promise.all(
      data.content.map(async (item: any) => {
        if (item._type === 'artworks') {
          const res = await fetch('http://localhost:3000/api/artworks')
          const jsonRes = await res.json()
          item.items = jsonRes
          return item
        }
        return item
      })
    )
  }
  return _data
}
