import S from '@sanity/desk-tool/structure-builder'
import EditIcon from 'part:@sanity/base/edit-icon'

import { GoBrowser as PageIcon } from 'react-icons/go'
import SeoPreview from '../../components/previews/seo'

export default S.listItem()
  .title('Pages')
  .schemaType('page')
  .icon(PageIcon)
  .child(
    S.documentTypeList('page')
      .title('Pages')
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .schemaType('page')
          .views([S.view.form().icon(EditIcon), SeoPreview])
      )
  )
