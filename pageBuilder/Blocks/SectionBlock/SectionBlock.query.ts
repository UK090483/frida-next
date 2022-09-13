import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'
import { FridaColors, FridaSizes } from 'types'
import { richTextQuery } from '../RichText/RichText.query'

export const sectionBlockQuery = (locale = '') => `
_type == "section" => {
  title,
  bgColor,
  type,
  topSpace,
  bottomSpace,
  ${richTextQuery(locale)},
  'photo': bgImage {
    ${imageMeta}
  }
}
`

export interface SectionResult extends PageBuilderBlockBase {
  _type: 'section'
  title: null | string
  bgColor: null | FridaColors
  type: null | 'text' | 'hero'
  topSpace: null | FridaSizes
  bottomSpace: null | FridaSizes
  content: null | any
  photo: null | ImageMetaResult
}
