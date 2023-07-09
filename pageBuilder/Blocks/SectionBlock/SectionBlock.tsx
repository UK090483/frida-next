import React from 'react'
import Section from '../../../components/Section'

import classNames from 'classnames'
import BodyParser from '../../BodyParser'
import { SectionResult } from './SectionBlock.query'

const SectionBlock: React.FC<SectionResult> = (props) => {
  const { type, bgColor, content, bottomSpace, topSpace, photo } = props

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
      {content && <BodyParser content={content} />}
    </Section>
  )
}

export default SectionBlock
