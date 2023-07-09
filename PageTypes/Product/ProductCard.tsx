import Card from '@components/Card'
import ProductName from '@components/ProductComponents/ProductName'
import { imageMeta, ImageMetaResult } from 'pageBuilder/queries/snippets'
import React from 'react'
import { GalleryTypes } from 'types'

export const productCardQuery = `
'slug':slug.current,
title,
title_en,
listingPhotos[]{
  listingPhoto {${imageMeta}}
},
description,
'price':price/100,
`
export type ProductCardResult = {
  slug: string
  title: string | null
  title_en: string | null
  excerpt: string | null
  excerpt_en: string | null
  listingPhotos: { listingPhoto: ImageMetaResult }[]
  price: number
}

interface ProductCardProps extends ProductCardResult {
  type: GalleryTypes
  isSwiping?: boolean
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { listingPhotos, slug, isSwiping, type, title, price } = props

  const photo =
    listingPhotos && listingPhotos[0] ? listingPhotos[0].listingPhoto : null

  return (
    <Card
      isSwiping={isSwiping}
      slug={slug}
      type="product"
      galleryType={type}
      photo={photo}
      title="Shop"
    >
      <div className="flex flex-wrap text-xl pt-5">
        <ProductName size={'m'} name={title || '---'} availability={true} />
        <div className="pl-2 ml-auto text-right">{price}€</div>
      </div>
    </Card>
  )
}

export default ProductCard
