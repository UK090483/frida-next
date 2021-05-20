import { imageMeta, ImageMetaResult } from './snippets'
import { getSanityClient } from '@lib/sanity'

import { site, SiteResult } from './pageQueries'

const productSingleView = `
...,
inStock,
galleryPhotos[]{
  forOption,
  photos[]{
    ${imageMeta}
  }
},
listingPhotos[]{
  listingPhoto {${imageMeta}}
},
price,
'variants':*[_type == 'productVariant' && productID == ^.productID]{
  ...
},
seo,
${site}
`

export type ProductSingleViewResult = {
  inStock: boolean
  galleryPhotos: { forOption: string; photos: ImageMetaResult[] }[]
  listingPhotos: { listingPhoto: ImageMetaResult[] }[]
  price: number
  title: null | string
  title_en: null | string
  site: SiteResult
}

export const getProductPage: (
  slug: string,
  preview: string
) => Promise<null | ProductSingleViewResult> = async (
  slug: string,
  preview: any
) => {
  const slugs = [`/${slug}`, slug, `/${slug}/`]
  const query = `
        *[_type == "product" && slug.current in ${JSON.stringify(slugs)}][0]{
          ${productSingleView},
          
        }
      `

  return await getSanityClient(preview).fetch(query)
}
