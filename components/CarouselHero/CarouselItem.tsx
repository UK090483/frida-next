import React from 'react'
import Section from '../Section'

import { CarouselHeroItem } from './CarouselHero'

const CarouselItem: React.FC<CarouselHeroItem> = (props) => {
  const { color = 'white', image, content } = props

  return (
    <Section type="full" backgroundColor={color}>
      <div className=" w-full relative flex flex-wrap hero">
        <div className="p-10 w-full md:w-1/2  flex  items-center h-1/2 md:h-full ">
          <div>{content}</div>
        </div>
        <div className="relative  w-full md:w-1/2 flex justify-center items-center  h-1/2 md:h-full ">
          {image}
        </div>
      </div>
    </Section>
  )
}

export default React.memo(CarouselItem)
