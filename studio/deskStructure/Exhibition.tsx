import S from '@sanity/desk-tool/structure-builder'
import EditIcon from 'part:@sanity/base/edit-icon'
import { GoBrowser as PageIcon } from 'react-icons/go'
import SeoPreview from '../components/previews/seo'

export default S.listItem()
  .title('Exhibitions')
  .schemaType('exhibition')
  .icon(PageIcon)
  .child(
    S.documentTypeList('exhibition')
      .title('Exhibitions')
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .schemaType('exhibition')
          .views([S.view.form().icon(EditIcon), SeoPreview])
      )
  )
