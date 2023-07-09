import React from 'react'
import Section from '../Section'

import { CarouselHeroItem } from './CarouselHero'
interface CarouselItemProps extends CarouselHeroItem {
  index?: number
}

const CarouselItem: React.FC<CarouselItemProps> = (props) => {
  const { color = 'white', image, content, index = 0 } = props

  return (
    <Section type="full" backgroundColor={color}>
      <div className="relative flex flex-wrap w-full hero">
        <div className="flex items-center w-full p-10 md:w-1/2 h-1/2 md:h-full ">
          <div data-item-index={index + 1}>{content}</div>
        </div>
        <div className="relative flex items-center justify-center w-full md:w-1/2 h-1/2 md:h-full ">
          {image}
        </div>
      </div>
    </Section>
  )
}

export default React.memo(CarouselItem)
