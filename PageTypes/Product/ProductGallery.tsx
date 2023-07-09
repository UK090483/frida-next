import Gallery from '@components/Gallery/Gallery'

import React from 'react'

import Section from '@components/Section'
import ProductCard, { ProductCardResult } from './ProductCard'

type ProductGalleryProps = {
  items?: ProductCardResult[]
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ items }) => {
  if (!items) return null
  return (
    <>
      <div id={'filter'} style={{ transform: 'translateY(-10vh)' }}></div>
      <Section type={'full'}>
        <Gallery
          type="grid"
          items={[
            items.map((item) => (
              <ProductCard key={item.slug} type="grid" {...item} />
            )),
          ]}
        />
      </Section>
    </>
  )
}

export default ProductGallery
