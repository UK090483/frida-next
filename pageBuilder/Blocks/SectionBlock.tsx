import React from 'react'
import Section from '../../components/Section'

import BodyParser from '../BodyParser'
import { PageBuilderBlockBase } from '@lib/queries/pageBuilderQueries'
import { imageMeta } from '@lib/api'
import { richTextQuery } from 'pageBuilder/Blocks/RichText'
import { ImageMetaResult } from '@lib/queries/snippets'
import { FridaColors, FridaLocation, FridaSizes } from 'types'
import classNames from 'classnames'

export const sectionBlockQuery = `
_type == "section" => {
  title,
  bgColor,
  type,
  topSpace,
  bottomSpace,
  ${richTextQuery},
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
  content_en: null | any
  photo: null | ImageMetaResult
}

interface SectionBlockProps extends SectionResult {
  lang: FridaLocation
}

const SectionBlock: React.FC<SectionBlockProps> = (props) => {
  const {
    type,
    bgColor,
    content,
    bottomSpace,
    topSpace,
    lang,
    content_en,
    photo,
  } = props

  const _content = lang === 'en' && content_en ? content_en : content

  return (
    <Section
      className={classNames(
        { 'pt-10': topSpace === 's' },
        { 'pt-20': topSpace === 'm' },
        { 'pt-32': topSpace === 'l' },
        { 'pt-44': topSpace === 'xl' },
        { 'pt-60': topSpace === 'xxl' },
        { 'pb-10': bottomSpace === 's' },
        { 'pb-20': bottomSpace === 'm' },
        { 'pb-32': bottomSpace === 'l' },
        { 'pb-44': bottomSpace === 'xl' },
        { 'pb-60': bottomSpace === 'xxl' },
        { 'pb-0.5': !bottomSpace }
      )}
      type={type}
      backgroundColor={bgColor || 'white'}
      bgImage={photo}
    >
      {content && <BodyParser lang={lang} content={_content} />}
    </Section>
  )
}

export default SectionBlock
