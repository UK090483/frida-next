import Carousel from '@components/CardCarousel'
import ProductCard from 'PageTypes/Product/ProductCard'
import ProductGallery from 'PageTypes/Product/ProductGallery'
import React from 'react'
import { FridaLocation } from 'types'
import { ProductsGalleryResult } from './ProductsBlock.query'

interface ProductsBlockProps extends ProductsGalleryResult {
  lang: FridaLocation
}

const ProductsBlock: React.FC<ProductsBlockProps> = (props) => {
  const { items = [], lang, type } = props

  if (type === 'masonry') {
    return <ProductGallery items={items} lang={lang} />
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
