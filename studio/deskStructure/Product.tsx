import S from '@sanity/desk-tool/structure-builder'

import EditIcon from 'part:@sanity/base/edit-icon'

// Web preview configuration
const remoteURL = 'https://gatsby-portfolio-preview-poc-4165823465.gtsb.io'
const localURL = 'http://localhost:8000'
const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL

export default S.listItem()
  .title('Produkte')
  .schemaType('product')
  .child(
    S.documentTypeList('product')
      .title('Produkte')
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .schemaType('product')
          .views([
            S.view.form().icon(EditIcon)
            // S.view
            //   .component(SeoPreview)
            //   .options({ previewURL })
            //   .icon(EyeIcon)
            //   .title("SEO Preview"),
          ])
      )
  )
