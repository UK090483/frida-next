import S from '@sanity/desk-tool/structure-builder'
import EditIcon from 'part:@sanity/base/edit-icon'
import EyeIcon from 'part:@sanity/base/eye-icon'
import { FiCopy, FiGift, FiShoppingCart } from 'react-icons/fi'
import SeoPreview from '../components/previews/seo/seo-preview'
import { localURL, remoteURL } from '../constants'

const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL
export default S.listItem()
  .title('Shop')
  .icon(FiShoppingCart)
  .id('shop')
  .child(
    S.list()
      .title('Shop')
      .items([
        S.listItem()
          .title('Products')
          .icon(FiGift)
          .child(
            S.documentTypeList('product')
              .title('Products')
              .child(documentId =>
                S.document()
                  .documentId(documentId)
                  .schemaType('product')
                  .views([
                    S.view.form().icon(EditIcon),
                    S.view
                      .component(SeoPreview)
                      .options({ previewURL })
                      .icon(EyeIcon)
                      .title('SEO Preview')
                  ])
              )
          ),
        S.listItem()
          .title('Product Variants')
          .icon(FiCopy)
          .child(
            S.documentTypeList('product')
              .title('By Product')
              .menuItems(S.documentTypeList('product').getMenuItems())
              .filter('_type == $type')
              .params({ type: 'product' })
              .child(productID =>
                S.documentList()
                  .title('Variants')
                  .menuItems(
                    S.documentTypeList('productVariant').getMenuItems()
                  )
                  .filter('_type == $type && productID == $id')
                  .params({
                    type: 'productVariant',
                    id: Number(productID.replace('product-', ''))
                  })
                  .child(documentId =>
                    S.document()
                      .documentId(documentId)
                      .schemaType('productVariant')
                      .views([
                        S.view.form().icon(EditIcon),
                        S.view
                          .component(SeoPreview)
                          .options({ previewURL })
                          .icon(EyeIcon)
                          .title('SEO Preview')
                      ])
                  )
              )
          ),
        S.listItem()
          .title('Collections')
          .schemaType('collection')
          .child(
            S.documentTypeList('collection')
              .title('Collections')
              .child(documentId =>
                S.document()
                  .documentId(documentId)
                  .schemaType('collection')
                  .views([
                    S.view.form().icon(EditIcon),
                    S.view
                      .component(SeoPreview)
                      .options({ previewURL })
                      .icon(EyeIcon)
                      .title('SEO Preview')
                  ])
              )
          )
      ])
  )
