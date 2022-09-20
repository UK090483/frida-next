import CarouselHero from '@components/CarouselHero/CarouselHero'
import Photo from '@components/Photo'
import React from 'react'

import BodyParser from '../../BodyParser'

import { CarouselHeroResult } from './CarouselHeroBlock.query'

const CarouselHeroBlock: React.FC<CarouselHeroResult> = (props) => {
  const { carouselHeroItems } = props
  if (!carouselHeroItems) return <></>

  const items = carouselHeroItems.map((item) => ({
    color: item.bgColor,
    content: <BodyParser content={item.content} />,
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
    </>
  )
}

export default CarouselHeroBlock
