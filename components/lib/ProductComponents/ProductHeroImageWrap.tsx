import React from 'react'

type ProductImageWrapProps = {
  children: React.ReactNode
}

const ProductImageWrap: React.FC<ProductImageWrapProps> = ({ children }) => {
  return (
    <div className="flex w-full md:w-1/2 flex-shrink-0 overflow-hidden pl-5 pr-5 md:pr-0 ">
      {children}
    </div>
  )
}

export default ProductImageWrap
