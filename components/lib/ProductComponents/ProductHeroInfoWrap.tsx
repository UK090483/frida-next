import React from 'react'

type ProductInfoWrapProps = {
  children: React.ReactNode
}

const ProductInfoWrap: React.FC<ProductInfoWrapProps> = ({ children }) => {
  return <div className="flex flex-col justify-end px-6 w-full">{children}</div>
}

export default ProductInfoWrap
