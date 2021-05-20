import { ProductSingleViewResult } from '@lib/queries/productQueries'
import ProductHero from './ProductHero'
import React from 'react'
import { FridaLocation } from 'types'

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
