import CarouselHero from '@components/CarouselHero/CarouselHero'
import { PageBuilderBlockBase } from '../pageBuilderQueries'
import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import React from 'react'
import { FridaColors, FridaLocation } from 'types'
import BodyParser from '../BodyParser'
import { richTextQuery } from './RichText'
import Photo from '@components/Photo'

export const carouselHeroBlockQuery = `
_type == "carouselHero" => {
  carouselHeroItems[]{
    ...,
     ${richTextQuery},
    'photo': image {
      ${imageMeta}
    }
   }
}
`
export interface CarouselHeroResult extends PageBuilderBlockBase {
  _type: 'carouselHero'
  carouselHeroItems: {
    bgColor: FridaColors
    photo: ImageMetaResult
    content: null | any
    content_en: null | any
  }[]
}

interface CarouselHeroBlockProps extends CarouselHeroResult {
  lang: FridaLocation
}
const CarouselHeroBlock: React.FC<CarouselHeroBlockProps> = (props) => {
  const { carouselHeroItems, lang } = props

  if (!carouselHeroItems) return <></>

  const items = carouselHeroItems.map((item) => ({
    color: item.bgColor,
    content: (
      <BodyParser
        lang="de"
        content={
          lang === 'en' && item.content_en ? item.content_en : item.content
        }
      />
    ),
    image: (
      <Photo
        photo={item.photo}
        layout="fill"
        sizes="(min-width: 640px) 50vw ,100vw"
      />
    ),
  }))

  return <CarouselHero items={items} />
}

export default CarouselHeroBlock
