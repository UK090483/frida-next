import React from 'react'
import Hero from '@components/hero/hero'
import { FridaColors } from '../../types'
import ContentParser from '../ContentParser'

type HeroBlockProps = {
  content: any
  bgColor: FridaColors
  bgImage: any
}

const HeroBlock: React.FC<HeroBlockProps> = (props) => {
  const { content, bgColor, bgImage } = props

  return (
    <Hero backgroundColor={bgColor} bgImage={bgImage}>
      <ContentParser lang="de" content={content} />
    </Hero>
  )
}
export default HeroBlock
