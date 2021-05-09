import S from '@sanity/desk-tool/structure-builder'

import { FiSettings, FiGlobe, FiRepeat } from 'react-icons/fi'
import { GoThreeBars } from 'react-icons/go'
import SeoPreview from '../../components/seo/seoPreviews'

const remoteURL = 'https://gatsby-portfolio-preview-poc-4165823465.gtsb.io'
const localURL = 'http://localhost:8000'
const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL

export default S.listItem()
  .title('Settings')
  .child(
    S.list()
      .title('Settings')
      .items([
        //   S.listItem()
        //     .title('General')
        //     .child(
        //       S.editor()
        //         .id('generalSettings')
        //         .schemaType('generalSettings')
        //         .documentId('generalSettings')
        //     )
        //     .icon(FiSettings),
        //   S.listItem()
        //     .title('Cookie Consent')
        //     .child(
        //       S.editor()
        //         .id('cookieSettings')
        //         .schemaType('cookieSettings')
        //         .documentId('cookieSettings')
        //     )
        //     .icon(FiCheckSquare),
        //   S.listItem()
        //     .title('Promo Bar')
        //     .child(
        //       S.editor()
        //         .id('promoSettings')
        //         .schemaType('promoSettings')
        //         .documentId('promoSettings')
        //     )
        //     .icon(FiTag),
        //   S.listItem()
        //     .title('Header')
        //     .child(
        //       S.editor()
        //         .id('headerSettings')
        //         .schemaType('headerSettings')
        //         .documentId('headerSettings')
        //     )
        //     .icon(FiNavigation),
        //   S.listItem()
        //     .title('Footer')
        //     .child(
        //       S.editor()
        //         .id('footerSettings')
        //         .schemaType('footerSettings')
        //         .documentId('footerSettings')
        //     )
        //     .icon(FiAnchor),
        //   S.listItem()
        //     .title('Cart')
        //     .child(
        //       S.editor()
        //         .id('cartSettings')
        //         .schemaType('cartSettings')
        //         .documentId('cartSettings')
        //     )
        //     .icon(FiShoppingCart),
        //   S.listItem()
        //     .title('Error Page')
        //     .child(
        //       S.editor()
        //         .id('errorPage')
        //         .schemaType('errorPage')
        //         .documentId('errorPage')
        //     )
        //     .icon(FiAlertOctagon),
        S.listItem()
          .title('Navigation')
          .child(
            S.editor()
              .id('navigation')
              .schemaType('navigation')
              .documentId('navigation')
          )
          .icon(GoThreeBars),
        S.listItem()
          .title('Default SEO / Share')
          .child(
            S.editor()
              .id('seoSettings')
              .schemaType('seoSettings')
              .documentId('seoSettings')
          )
          .icon(FiGlobe),
        //   S.listItem()
        //     .title('Menus')
        //     .child(S.documentTypeList('menu').title('Menus'))
        //     .icon(FiMenu),
        S.listItem()
          .title('Redirects')
          .child(S.documentTypeList('redirect').title('Redirects'))
          .icon(FiRepeat)
      ])
  )
  .icon(FiSettings)
