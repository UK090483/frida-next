import S from '@sanity/desk-tool/structure-builder'
import EditIcon from 'part:@sanity/base/edit-icon'
import EyeIcon from 'part:@sanity/base/eye-icon'
import { GoHome, GoSettings, GoThreeBars } from 'react-icons/go'
import IframePreview from '../../components/iframe/IframePreview'
import Pages from './Page'
import Quotes from './Quotes'
import Supporter from './supporterLogos'
import Settings from './Settings'

const remoteURL = 'https://gatsby-portfolio-preview-poc-4165823465.gtsb.io'
const localURL = 'http://localhost:8000'
const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL
import SeoPreview from '../../components/previews/seo/seo-preview'
export default S.listItem()
  .title('WebPage')
  .child(
    S.list()
      .title('Web Page')
      .items([
        Supporter,
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
          ),

        Settings
        // S.documentListItem()
        //   .schemaType('siteSettings')
        //   .title('Settings')
        //   .icon(GoSettings),

        // S.documentListItem()
        //   .schemaType('navigation')
        //   .title('Navigation')
        //   .icon(GoThreeBars)
        //   .child(
        //     S.document()
        //       .schemaType('navigation')
        //       .documentId('navigation')
        //   )
      ])
  )
