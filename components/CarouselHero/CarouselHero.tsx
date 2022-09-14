/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import HeroNav from './HeroNav'
import CarouselItem from './CarouselItem'
import ButtonNav from '../buttons/ButtonNav'
import type KeenSlider from 'keen-slider'
import { useKeenSlider } from 'keen-slider/react'
import { FridaColors } from '../../types'
import useKeydown from '@lib/helper/useKeydown'
import { useAutoplay } from '@lib/helpers'

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
  const [pause, setPause] = React.useState(false)
  const rootRef = React.useRef<null | HTMLDivElement>(null)
  const tabableElements = React.useRef<null | NodeListOf<Element>>(null)

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
    slideChanged: (k: KeenSlider) => {
      setState(k.details().relativeSlide)
    },
  })

  const setNext = () => slider && slider.next()
  const setPrev = () => slider && slider.prev()
  const setSlide = (number: number) => {
    slider && slider.moveToSlide(number)
    setState(number)
  }

  useKeydown({ ArrowLeft: setPrev, ArrowRight: setNext })

  const { play, stop } = useAutoplay(() => {
    slider.next()
  }, 5000)

  React.useEffect(() => {
    if (!rootRef.current) return
    tabableElements.current = rootRef.current.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    )
    tabableElements.current.forEach((e) => {
      e.setAttribute('tabIndex', '-1')
    })
  }, [rootRef.current])

  React.useEffect(() => {
    play()
    if (!tabableElements.current) return
    // tabableElements.current.forEach((e) => {
    //   const i = e.parentElement?.getAttribute('item-index')
    //   if (i && parseInt(i) - 1 === state) {
    //     console.log(e)
    //     e.focus()
    //   } else {
    //     e.blur()
    //   }
    // })
  }, [])

  return (
    <div
      ref={rootRef}
      className="relative"
      onFocus={(e) => {
        e.stopPropagation()
        const itemIndex =
          e.target.parentElement?.getAttribute('data-item-index')
        if (itemIndex) {
          setSlide(parseInt(itemIndex) - 1)
        }
      }}
      onMouseEnter={() => {
        stop()
      }}
      onMouseLeave={() => {
        play()
      }}
    >
      <div ref={sliderRef} className="keen-slider">
        {items.map((item, index) => (
          <div
            key={index}
            className="keen-slider__slide keen-slider__slide--fullwidth"
          >
            <CarouselItem {...item} index={index} />
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
