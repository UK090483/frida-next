import ProductHero from './ProductHero'
import React from 'react'
import { FridaLocation } from 'types'
import { imageMeta } from '@lib/api'

import { ImageMetaResult } from '@lib/queries/snippets'
import { SiteResult } from '@lib/queries/cache'
import { site } from '@lib/queries/pageQueries'

export const productSingleViewQuery = `
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
options[]{
  name,
  position,
  values[]
},
optionSettings[]{
  forOption,
  color
},


'price':price/100,
"variants": *[_type == "productVariant" && productID == ^.productID && wasDeleted != true && isDraft != true]{
  "id": variantID,
  title,
  'price':price/100,
  comparePrice,
  inStock,
  lowStock,
  options[]{
    name,
    position,
    value
  },
  seo
},
seo,
'site':'getSite'
`

export type ProductSingleViewResult = {
  inStock: boolean
  galleryPhotos: { forOption: string; photos: ImageMetaResult[] }[] | null
  listingPhotos: { listingPhoto: ImageMetaResult[] }[]
  price: number
  title: null | string
  title_en: null | string
  site: SiteResult
  variants: {
    id: string
    price: number
    title: string
    options: { name: string; position: number; value: string }[]
  }[]
  options: any[]
}

interface ProductSingleProps extends ProductSingleViewResult {
  lang: FridaLocation
  shopifyProduct?: any
  isModal?: boolean
}

const ProductSingle: React.FC<ProductSingleProps> = (props) => {
  return (
    <>
      <ProductHero {...props} />
    </>
  )
}

export default ProductSingle
