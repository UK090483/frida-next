import React from 'react'
import Section from '../Section'

import { CarouselHeroItem } from './CarouselHero'

const CarouselItem: React.FC<CarouselHeroItem> = (props) => {
  const { color = 'white', image, content } = props

  return (
    <Section type="full" backgroundColor={color}>
      <div className="carousel-Hero--item ">
        <div className="carousel-Hero--content">
          <div>{content}</div>
        </div>
        <div className="carousel-Hero--image">{image}</div>
      </div>
    </Section>
  )
}

export default React.memo(CarouselItem)
