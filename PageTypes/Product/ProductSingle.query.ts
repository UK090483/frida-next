import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'

export const productSingleViewQuery = (locale: string) => `
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
  variants: ProductVariant[]
  optionSettings?: IProductOptionSetting[]
  options: IProductOption[] | undefined | null
}
