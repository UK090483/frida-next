import React from 'react'

import CarouselHero from '@components/hero/CarussellHero/CarussellHero'
import { FridaColors } from 'types'
import ContentParser from '../ContentParser'
import ImageParser from '../ImageParser'

type CarouselHeroBlockProps = {
  carouselHeroItems?: { color: FridaColors; content: any[] }[]
}
const CarouselHeroBlock: React.FC<CarouselHeroBlockProps> = (props) => {
  const { carouselHeroItems } = props

  if (!carouselHeroItems) return <></>

  const items = carouselHeroItems.map((item: any) => ({
    color: item.bgColor,
    content: <ContentParser lang="de" content={item.content} />,
    image: (
      <ImageParser
        image={item.image}
        photo={item.photo}
        layout="fill"

        // style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    ),
  }))

  return <CarouselHero items={items} />
}

export default CarouselHeroBlock
