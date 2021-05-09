import React from "react"

const ProductGrid: React.FC = ({ children }) => {
  return (
    <div className="flex flex-wrap pt-12 px-5 md:section_padding">
      {children}
    </div>
  )
}

export default ProductGrid
