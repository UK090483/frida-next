import React from "react"
import PageHelmet from "./pageHelmet"
import ProductHelmet from "./productHelmet"

type SEOPros = {
  title: string
  path: string
  artwork?: any
  product?: any
}

const SEO: React.FC<SEOPros> = props => {
  const { title, path, artwork, product } = props

  if (product || artwork) {
    return (
      <ProductHelmet
        // title={title}
        path={path}
        product={product}
        artwork={artwork}
      />
    )
  }
  return <PageHelmet title={title} path={path} />
}

export default SEO
