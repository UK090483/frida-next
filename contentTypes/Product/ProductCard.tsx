import React from 'react'
import Link from 'next/link'
import Frida from '@components/Frida'
import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import FridaImage, {
  ARTWORK_IMAGE_PROPS,
} from '@components/fridaImage/FridaImage'

import { useModalContext } from '@lib/modalContext'
import { GalleryTypes } from 'types'
import ProductName from '@components/lib/ProductComponents/ProductName'
import CardWrap from '@components/CardCarousel/CardWrap'

export const productCardQuery = `
'slug':slug.current,
title,
title_en,
listingPhotos[]{
  listingPhoto {${imageMeta}}
},
description,
price
`
export type ProductCardResult = {
  slug: string
  title: string | null
  title_en: string | null
  excerpt: string | null
  excerpt_en: string | null
  listingPhotos: { listingPhoto: ImageMetaResult[] }[]
  price: number
}

interface ProductCardProps extends ProductCardResult {
  type: GalleryTypes
  isSwiping?: boolean
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { listingPhotos, slug, isSwiping, type, title, price } = props

  const photo = listingPhotos[0] ? listingPhotos[0].listingPhoto : null

  const { pushAsModal } = useModalContext()

  return (
    <CardWrap
      isSwiping={isSwiping}
      slug={slug}
      type="product"
      galleryType={type}
    >
      {photo && (
        <div className="aspect-w-9 aspect-h-12">
          <FridaImage photo={photo} {...ARTWORK_IMAGE_PROPS} layout="fill" />
        </div>
      )}
      <div className="text-lg font-bold mt-3">
        <Frida text="Shop" textColor="pink" />
      </div>
      <div className="flex flex-wrap text-xl pt-5">
        <ProductName size={'m'} name={title || '---'} availability={true} />
        <div className="pl-2 ml-auto text-right">{price}€</div>
      </div>
    </CardWrap>
  )
}

export default ProductCard
