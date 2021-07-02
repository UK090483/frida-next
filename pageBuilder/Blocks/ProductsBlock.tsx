import { PageBuilderBlockBase } from '../pageBuilderQueries'
import Carousel from '@components/CardCarousel'
import ProductCard, {
  productCardQuery,
  ProductCardResult,
} from 'PageTypes/Product/ProductCard'
import ProductGallery from 'PageTypes/Product/ProductGallery'
import React from 'react'
import { FridaLocation } from 'types'

export const productsBlockQuery = `
_type == "products" => {
  type,
  'items': *[_type == 'product']{
    ${productCardQuery}
  }
}
`
export interface ProductsGalleryResult extends PageBuilderBlockBase {
  _type: 'products'
  type: 'carousel' | 'masonry'
  items: ProductCardResult[]
}

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
        <ProductCard type="carousel" {...item} />
      ))}
    />
  )
}

export default ProductsBlock
