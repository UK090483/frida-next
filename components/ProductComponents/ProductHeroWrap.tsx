import React from 'react'

type ProductHeroWrapProps = {
  children: React.ReactNode
}

const ProductHeroWrap: React.FC<ProductHeroWrapProps> = ({ children }) => {
  return (
    <div
      data-testid={'productHeroWrap'}
      className={`relative pt-24 pb-14 lg:flex lg:h-screen bg-frida-white `}
      data-color={'white'}
    >
      {children}
    </div>
  )
}

export default ProductHeroWrap
