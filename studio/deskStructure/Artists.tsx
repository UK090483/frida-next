import S from '@sanity/desk-tool/structure-builder'
import EditIcon from 'part:@sanity/base/edit-icon'
import SeoPreview from '../components/previews/seo'

export default S.listItem()
  .title('Artists')
  .schemaType('artist')
  .child(
    S.documentTypeList('artist')
      .title('Artist')
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .schemaType('artist')
          .views([S.view.form().icon(EditIcon), SeoPreview])
      )
  )
