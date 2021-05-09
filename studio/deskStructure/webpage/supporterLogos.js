import S from '@sanity/desk-tool/structure-builder'

import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'

const localURL = 'http://localhost:8000'
const remoteURL = 'https://gatsby-portfolio-preview-poc-4165823465.gtsb.io'
const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL

export default S.listItem()
  .title('Supporter')
  .child(
    S.editor()
      .schemaType('supporterLogos')
      .documentId('supporterLogos')
      .views([S.view.form().icon(EditIcon)])
  )
