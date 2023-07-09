import ProductHero from './ProductHero'
import { ProductSingleViewResult } from './ProductSingle.query'

const ProductSingle: React.FC<ProductSingleViewResult> = (props) => {
  return <ProductHero {...props} />
}

export default ProductSingle
