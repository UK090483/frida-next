import S from '@sanity/desk-tool/structure-builder'

import EditIcon from 'part:@sanity/base/edit-icon'

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
          .views([S.view.form().icon(EditIcon)])
      )
  )
