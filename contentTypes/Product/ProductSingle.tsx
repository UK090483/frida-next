import ProductHero from './ProductHero'
import React from 'react'
import { FridaLocation } from 'types'
import { imageMeta } from '@lib/api'

import { ImageMetaResult } from '@lib/queries/snippets'
import { SiteResult } from '@lib/queries/cache'

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
export interface ProductGalleryPhotos {
  forOption: string
  photos: ImageMetaResult[]
}
export interface ProductVariant {
  id: string
  price: number
  title: string
  inStock: boolean
  lowStock: boolean
  options: { name: string; position: number; value: string }[]
}
export interface IProductOption {
  name: string
  position: number
  values: string[]
}
export interface IProductOptionSetting {
  forOption: string
  color: unknown
}

export type ProductSingleViewResult = {
  inStock: boolean
  galleryPhotos: ProductGalleryPhotos[] | null
  listingPhotos: { listingPhoto: ImageMetaResult }[]
  price: number
  title: null | string
  title_en: null | string
  site: SiteResult
  variants: ProductVariant[]
  optionSettings?: IProductOptionSetting[]
  options: IProductOption[] | undefined | null
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
