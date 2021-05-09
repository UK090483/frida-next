import { getSanityClient } from '@lib/sanity'

const navigation = /* groq */ `
'navigation':*[_type == "navigation"][0]{
  'items': item[]{
    label,
    label_en,
    link,
    'internalLink':internalLink->slug.current
  }
}
`
const seo = /* groq */ `
"seo": *[_type == "seoSettings"][0]{
  siteTitle,
  metaTitle,
  metaDesc,
  shareTitle,
  shareDesc,
  shareGraphic
}
`
export const site = /* groq */ `
'site':{
  ${navigation}
  ,
  ${seo}
}
`

import {
  artworks,
  artworkCarousel,
  buttonPlug,
  carouselHero,
} from './pageBuilderQueries'

export const page = `
...,
content[]{
  ...,
  ${carouselHero},
  ${artworkCarousel},
  ${artworks},
  content[]{
    ...,
    ${buttonPlug}
  }
},

${site}


`

export async function getIndexPage(pageData: string, preview: any) {
  const query = `*[_type == 'indexPage'][0]{
      ${page}
    }
  `
  const data = await getSanityClient(preview).fetch(query)
  return data
}

export async function getPage(slug: string, preview: any) {
  const slugs = [`/${slug}`, slug, `/${slug}/`]
  const query = `
        *[_type == "page" && slug.current in ${JSON.stringify(slugs)}][0]{
         ${page}
        }
      `
  const data = await getSanityClient(preview).fetch(query)

  return data
}
