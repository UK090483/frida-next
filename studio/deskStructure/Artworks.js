import S from '@sanity/desk-tool/structure-builder'

import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'
// import { MdAccessibility } from "react-icons/lib/md";

import { remoteURL, localURL } from '../constants'
import SeoPreview from '../components/previews/seo/seo-preview'
import IframePreview from '../components/iframe/IframePreview'

const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL

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
