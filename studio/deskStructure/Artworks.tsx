import S from '@sanity/desk-tool/structure-builder'

import SeoPreview from '../components/previews/seo'
import EditIcon from 'part:@sanity/base/edit-icon'

export default S.listItem()
  .title('Artworks')
  .schemaType('artwork')
  .child(
    S.documentTypeList('artwork')
      .title('Projects')
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .schemaType('artwork')
          .views([S.view.form().icon(EditIcon), SeoPreview])
      )
  )
