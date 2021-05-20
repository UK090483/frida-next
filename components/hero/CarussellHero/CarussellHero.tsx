import * as React from 'react'
import HeroNav from './HeroNav'
import CarouselItem from './CarouselItem'
import ButtonNav from './ButtonNav'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FridaColors } from '../../../types'

export type CarouselHeroItem = {
  color: FridaColors
  image: React.ReactNode
  content: React.ReactNode
}

type CarouselHeroProps = {
  items: CarouselHeroItem[]
}

const CarouselHero: React.FC<CarouselHeroProps> = ({ items }) => {
  const [state, setState] = React.useState(0)
  const carousel = React.useRef<null | Carousel>(null)
  const hasMultiple = items.length > 1

  const onChange = (value: number) => {
    setState(value)
  }

  const setNext = () => {
    if (carousel.current) {
      carousel.current.goToSlide((state + 1) % items.length)
    }
  }

  const setPrev = () => {
    if (carousel.current) {
      carousel.current.goToSlide(state === 0 ? items.length - 1 : state - 1)
    }
  }

  const setSlide = (number: number) => {
    if (carousel.current) {
      carousel.current.goToSlide(number)
    }
  }

  React.useEffect(() => {
    if (typeof window === `undefined` && hasMultiple) return
    const interval = setInterval(() => {
      setNext()
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [items.length, state])

  return (
    <>
      <Carousel
        infinite={false}
        ssr={true}
        ref={carousel}
        beforeChange={(number) => {
          onChange(number)
        }}
        responsive={{
          mobile: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
          },
        }}
        customRightArrow={<></>}
        customLeftArrow={<></>}
        draggable={true}
        showDots={false}
      >
        {items.map((item, index) => (
          <CarouselItem key={index} {...item} />
        ))}
      </Carousel>

      {hasMultiple && <ButtonNav setNext={setNext} setPrev={setPrev} />}
      {hasMultiple && (
        <HeroNav current={state} setValue={setSlide} items={items} />
      )}
    </>
  )
}
export default CarouselHero
