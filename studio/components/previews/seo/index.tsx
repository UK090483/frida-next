import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import SeoPreview from './seo-preview'
import { remoteURL, localURL } from '../../../constants'
import EyeIcon from 'part:@sanity/base/eye-icon'

const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL

export default S.view
  .component(SeoPreview)
  .options({ previewURL })
  .icon(EyeIcon)
  .title('SEO Preview')
