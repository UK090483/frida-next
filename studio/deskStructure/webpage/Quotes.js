import S from '@sanity/desk-tool/structure-builder'

import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'

import SeoPreview from '../../components/seo/seoPreviews'

const remoteURL = 'https://gatsby-portfolio-preview-poc-4165823465.gtsb.io'
const localURL = 'http://localhost:8000'
const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL

export default S.listItem()
  .title('Zitate')
  .schemaType('quote')
  .child(
    S.documentTypeList('quote')
      .title('Zitate')
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .schemaType('quote')
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
