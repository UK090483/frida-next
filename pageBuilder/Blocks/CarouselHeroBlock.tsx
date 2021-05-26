import FridaImage from '@components/fridaImage/FridaImage'
import CarouselHero from '@components/CarussellHero/CarussellHero'
import { PageBuilderBlockBase } from '@lib/queries/pageBuilderQueries'
import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import { richTextQuery } from 'pageBuilder/RichText'
import React from 'react'
import { FridaColors, FridaLocation } from 'types'
import BodyParser from '../BodyParser'

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
      <FridaImage photo={item.photo} layout="fill" className="w-full h-full" />
    ),
  }))

  return <CarouselHero items={items} />
}

export default CarouselHeroBlock
