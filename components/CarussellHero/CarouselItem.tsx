import React from 'react'
import Section from '../Section'

import { CarouselHeroItem } from './CarussellHero'

const CarouselItem: React.FC<CarouselHeroItem> = (props) => {
  const { color, image, content } = props

  return (
    <Section type="full" backgroundColor={color}>
      <div className="w-full relative flex flex-wrap h-screen ">
        <div className="p-10 w-full md:w-1/2 flex  items-center h-vh/2 md:h-screen ">
          <div>{content}</div>
        </div>
        <div className=" w-full md:w-1/2 flex justify-center items-center  h-vh/2 md:h-screen ">
          {image}
        </div>
      </div>
    </Section>
  )
}

export default React.memo(CarouselItem)
