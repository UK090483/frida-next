import React from 'react'

type ProductImageWrapProps = {
  children: React.ReactNode
}

const ProductImageWrap: React.FC<ProductImageWrapProps> = ({ children }) => {
  return (
    <div className="flex w-full lg:w-1/2  overflow-hidden px-frida_side  md:px-20 lg:px-6 ">
      {children}
    </div>
  )
}

export default ProductImageWrap
