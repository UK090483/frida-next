import { ProductSingleViewResult } from 'contentTypes/Product/ProductSingle'
import React from 'react'

import ProductOption from './product-option'

type ProductFormProps = {
  product: ProductSingleViewResult
  activeVariant: string
  onVariantChange: (id: string) => void
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  activeVariant,
  onVariantChange,
}) => {
  if (!product?.options?.length) return null

  return (
    <div className="product--options">
      {product.options?.map(
        (option, key) =>
          option.values?.length && (
            //@ts-ignore
            <ProductOption
              key={key}
              position={key}
              option={option}
              optionSettings={product.optionSettings}
              variants={product.variants}
              activeVariant={activeVariant}
              onChange={onVariantChange}
            />
          )
      )}
    </div>
  )
}

export default ProductForm
