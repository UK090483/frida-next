import * as React from 'react'
import HeroNav from './HeroNav'
import CarouselItem from './CarouselItem'
import ButtonNav from '../buttons/ButtonNav'
import KeenSlider, { useKeenSlider } from 'lib/slider/react'
import { FridaColors } from '../../types'

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
  const hasMultiple = items.length > 1
  const timer = React.useRef<null | NodeJS.Timeout>()
  const [pause, setPause] = React.useState(false)

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1,
    loop: true,
    mode: 'snap',
    centered: true,
    duration: 1000,
    dragStart: () => {
      setPause(true)
    },
    dragEnd: () => {
      setPause(false)
    },
    beforeChange: (k: KeenSlider) => {
      setActiveSlide(k.details().direction)
    },
  })

  const setActiveSlide = (dir: 1 | -1 | 0) => {
    if (dir === 1) {
      setState((oS) => oS + 1)
    }
    if (dir === -1) {
      setState((oS) => oS - 1)
    }
  }

  const setNext = () => slider && slider.next()
  const setPrev = () => slider && slider.prev()
  const setSlide = (number: number) => {
    slider && slider.moveToSlide(number)
    setState(number)
  }

  React.useEffect(() => {
    if (!sliderRef || !sliderRef.current) return
    sliderRef.current.addEventListener('mouseover', () => {
      setPause(true)
    })
    sliderRef.current.addEventListener('mouseout', () => {
      setPause(false)
    })
  }, [sliderRef])

  React.useEffect(() => {
    if (typeof window === `undefined` && hasMultiple) return
    timer.current = setInterval(() => {
      if (!pause) {
        slider && slider.next()
        setActiveSlide(1)
      }
    }, 5000)
    return () => {
      timer.current && clearInterval(timer.current)
    }
  }, [hasMultiple, pause, slider])

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {items.map((item, index) => (
          <div
            key={index}
            className="keen-slider__slide keen-slider__slide--fullwidth"
          >
            <CarouselItem {...item} />
          </div>
        ))}
      </div>

      {hasMultiple && (
        <div className="absolute top-0 flex items-end pointer-events-none pb-frida_side md:pb-frida_side_big hero right-frida_side md:right-frida_side_big ">
          <ButtonNav setNext={setNext} setPrev={setPrev} />
        </div>
      )}

      {hasMultiple && (
        <div className="absolute top-0 left-0 flex items-end pb-2 transform -translate-y-1/2 pointer-events-none hero md:translate-y-0">
          <HeroNav
            pause={pause}
            current={state % items.length}
            setValue={setSlide}
            items={items}
          />
        </div>
      )}
    </div>
  )
}
export default CarouselHero
