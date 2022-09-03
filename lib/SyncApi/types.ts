import Shopify from 'shopify-api-node'

export type CreateArtwork = Pick<
  Shopify.IProduct,
  | 'title'
  | 'body_html'
  | 'status'
  | 'vendor'
  | 'product_type'
  | 'published_scope'
> & {
  variants: [
    Pick<
      Shopify.IProductVariant,
      | 'inventory_management'
      | 'inventory_quantity'
      | 'price'
      | 'requires_shipping'
    >
  ]
}
