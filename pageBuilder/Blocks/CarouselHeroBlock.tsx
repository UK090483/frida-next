import CarouselHero from '@components/CarouselHero/CarouselHero'
import { PageBuilderBlockBase } from '../pageBuilderQueries'
import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import React from 'react'
import { FridaColors, FridaLocation } from 'types'
import BodyParser from '../BodyParser'
import { richTextQuery, richTextQueryEn } from './RichText'
import Photo from '@components/Photo'

import Search from '@components/Search/Search'
// import CarouselItem from '@components/CarouselHero/CarouselItem'

export const carouselHeroBlockQuery = `
_type == "carouselHero" => {
  carouselHeroItems[]{
    ...,
     ${richTextQuery},
     ${richTextQueryEn},
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

  // if (carouselHeroItems.length === 1)
  //   return (
  //     <CarouselItem
  //       color={carouselHeroItems[0].bgColor}
  //       content={
  //         <BodyParser
  //           lang="de"
  //           content={
  //             lang === 'en' && carouselHeroItems[0].content_en
  //               ? carouselHeroItems[0].content_en
  //               : carouselHeroItems[0].content
  //           }
  //         />
  //       }
  //       image={
  //         <Photo
  //           photo={carouselHeroItems[0].photo}
  //           layout="fill"
  //           sizes="(min-width: 640px) 50vw ,100vw"
  //         />
  //       }
  //     />
  //   )

  const items = carouselHeroItems.map((item) => ({
    color: item.bgColor,
    content: (
      <BodyParser
        content={
          lang === 'en' && item.content_en ? item.content_en : item.content
        }
      />
    ),
    image: (
      <Photo
        photo={item.photo}
        layout="fill"
        sizes="(min-width: 640px) 100vw"
      />
    ),
  }))

  return (
    <>
      <CarouselHero items={items} />
      <Search />
    </>
  )
}

export default CarouselHeroBlock
