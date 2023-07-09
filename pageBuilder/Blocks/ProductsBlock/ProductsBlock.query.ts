import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'
import {
  productCardQuery,
  ProductCardResult,
} from 'PageTypes/Product/ProductCard'

export const productsBlockQuery = `
_type == "products" => {
  type,
  'items': *[_type == 'product']{
    ${productCardQuery}
  }
}
`
export interface ProductsGalleryResult extends PageBuilderBlockBase {
  _type: 'products'
  type: 'carousel' | 'masonry'
  items: ProductCardResult[]
}
