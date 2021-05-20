import React from 'react'
import Section from '../../components/container/section'

import { spaceToTailwind } from '../helper/spaceToTailwind'
import BodyParser from '../BodyParser'
import { PageBuilderBlockBase } from '@lib/queries/pageBuilderQueries'
import { imageMeta } from '@lib/api'
import { richTextQuery } from 'pageBuilder/RichText'
import { ImageMetaResult } from '@lib/queries/snippets'
import { FridaColors, FridaSizes } from 'types'

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
  lang: string
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
      className={`${spaceToTailwind(topSpace, 'pt')} ${spaceToTailwind(
        bottomSpace,
        'pb',
        'pb-0.5'
      )}`}
      type={type}
      backgroundColor={bgColor || 'white'}
      bgImage={photo}
    >
      {content && <BodyParser lang={lang} content={_content} />}
    </Section>
  )
}

export default SectionBlock
