import S from '@sanity/desk-tool/structure-builder'
import EditIcon from 'part:@sanity/base/edit-icon'

import { GoHome } from 'react-icons/go'
import SeoPreview from '../../components/previews/seo'
import Pages from './Page'
import Quotes from './Quotes'
import Settings from './Settings'

export default S.listItem()
  .title('WebPage')
  .child(
    S.list()
      .title('Web Page')
      .items([
        Quotes,
        Pages,
        S.documentListItem()
          .title('Front page')
          .schemaType('indexPage')
          .icon(GoHome)
          .child(
            S.document()
              .schemaType('indexPage')
              .documentId('frontPage')
              .views([S.view.form().icon(EditIcon), SeoPreview])
          ),

        Settings
      ])
  )
