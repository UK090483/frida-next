import S from '@sanity/desk-tool/structure-builder'

import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'
// import { MdAccessibility } from "react-icons/lib/md";

// Web preview
// import IframePreview from '../components/previews/iframe/IframePreview'

import SeoPreview from '../components/previews/seo/seo-preview'

// a11y preview
// import ColorblindPreview from "../components/previews/a11y/colorblind-filter/ColorblindPreview";
// import TextToSpeechPreview from "../components/previews/a11y/text-to-speech/TextToSpeechPreview";
// import BraillePreview from "../components/previews/a11y/braille/Braille";

// Web preview configuration
const remoteURL = 'https://gatsby-portfolio-preview-poc-4165823465.gtsb.io'
const localURL = 'http://localhost:8000'
const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL

export default S.listItem()
  .title('Medium')
  .schemaType('medium')
  .child(
    S.documentTypeList('medium')
      .title('Medium')
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .schemaType('medium')
          .views([S.view.form().icon(EditIcon)])
      )
  )
