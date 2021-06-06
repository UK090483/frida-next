import React from 'react'

type ProductInfoWrapProps = {
  children: React.ReactNode
}

const ProductInfoWrap: React.FC<ProductInfoWrapProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-end  px-frida_side lg:px-6 w-full lg:w-1/2">
      {children}
    </div>
  )
}

export default ProductInfoWrap
