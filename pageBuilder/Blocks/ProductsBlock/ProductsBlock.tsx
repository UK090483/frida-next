import Carousel from '@components/CardCarousel'
import ProductCard from 'PageTypes/Product/ProductCard'
import ProductGallery from 'PageTypes/Product/ProductGallery'
import React from 'react'
import { FridaLocation } from 'types'
import { ProductsGalleryResult } from './ProductsBlock.query'

const ProductsBlock: React.FC<ProductsGalleryResult> = (props) => {
  const { items = [], type } = props

  if (type === 'masonry') {
    return <ProductGallery items={items} />
  }

  return (
    <Carousel
      items={items.map((item) => (
        <ProductCard key={item.slug} type="carousel" {...item} />
      ))}
    />
  )
}

export default ProductsBlock
