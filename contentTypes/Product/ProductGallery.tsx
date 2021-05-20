import Gallery from '@components/lib/Gallery/Gallery'

import React from 'react'

import { FridaLocation } from 'types'
import Section from '@components/container/section'
import ProductCard, { ProductCardResult } from './ProductCard'

type ProductGalleryProps = {
  items?: ProductCardResult[]
  lang: FridaLocation
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ items, lang }) => {
  if (!items) return null
  return (
    <>
      <div id={'filter'} style={{ transform: 'translateY(-10vh)' }}></div>
      <Section type={'full'}>
        <div className="py-12">
          <Gallery
            type="grid"
            items={[
              items.map((item) => (
                <ProductCard key={item.slug} type="grid" {...item} />
              )),
            ]}
          />
        </div>
      </Section>
    </>
  )
}

export default ProductGallery
