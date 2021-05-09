import S from '@sanity/desk-tool/structure-builder'
import EditIcon from 'part:@sanity/base/edit-icon'
import EyeIcon from 'part:@sanity/base/eye-icon'
import { GoBrowser as PageIcon } from 'react-icons/go'

import { localURL, remoteURL } from '../../constants'
import IframePreview from '../../components/iframe/IframePreview'

const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL

import SeoPreview from '../../components/previews/seo/seo-preview'
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
          .views([
            S.view.form().icon(EditIcon),
            S.view
              .component(IframePreview)
              .options({ previewURL })
              .title('Web Preview')
              .icon(EyeIcon),
            S.view
              .component(SeoPreview)
              .options({ previewURL })
              .title('Seo Preview')
              .icon(EyeIcon)
          ])
      )
  )
