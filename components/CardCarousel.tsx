import * as React from 'react'
import { FridaColors } from 'types'
import Section from './Section'
import { useKeenSlider } from 'keen-slider/react'
import type { TOptions } from 'keen-slider'

import Icon from './Icon'

type CarouselProps = {
  items: React.ReactElement[]
  responsive?: TOptions['breakpoints']
  bgColor?: FridaColors
  header?: string | null | undefined
}
const defaultResponsive: TOptions['breakpoints'] = {
  '(min-width: 768px)': {
    slidesPerView: 3.5,
  },
  '(min-width: 1600px)': {
    slidesPerView: 4.5,
  },
}

type CarouselState = {
  showPrev: boolean
  showNext: boolean
}

const Carousel: React.FC<CarouselProps> = ({
  items = [],
  responsive = defaultResponsive,
  bgColor = 'grey',
  header,
}) => {
  const [state, setState] = React.useState<CarouselState>({
    showPrev: false,
    showNext: true,
  })
  const { showPrev, showNext } = state
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1.5,
    mode: 'snap',
    breakpoints: responsive,
    created(s) {
      const { size, slidesPerView } = s.details()

      setState((oS) => ({ ...oS, showNext: size > slidesPerView }))
    },
    slideChanged(s) {
      const { relativeSlide, size, slidesPerView } = s.details()

      setState((oS) => ({
        ...oS,
        showPrev: relativeSlide > 0,
        showNext: size - relativeSlide > slidesPerView,
      }))
    },
  })

  const setNext = () => {
    slider.next()
  }
  const setPrev = () => {
    slider.prev()
  }

  return (
    <Section
      type="full"
      backgroundColor={bgColor}
      className="horizontal-padding"
    >
      {header && (
        <div className={`text-md-fluid   font-bold px-frida_7% `}>{header}</div>
      )}
      <div className={`py-3 md:py-12 relative`}>
        <div ref={sliderRef} className="keen-slider">
          {items.map((item, index) => (
            <div key={index} className="keen-slider__slide ">
              {item}
            </div>
          ))}
        </div>
        {showPrev && (
          <CustomArrow
            icon="arrowLeft"
            className="absolute transform -translate-y-1/2 top-1/2 left-2 md:left-5"
            onClick={setPrev}
          />
        )}
        {showNext && (
          <CustomArrow
            icon="arrowRight"
            className="absolute transform -translate-y-1/2 top-1/2 right-2 md:right-5"
            onClick={setNext}
          />
        )}
      </div>
    </Section>
  )
}

export default Carousel

type CustomArrowProps = {
  onClick: () => void
  className: string
  icon: 'arrowRight' | 'arrowLeft'
}

const CustomArrow: React.FC<CustomArrowProps> = ({
  onClick,
  className,
  icon,
}) => {
  return (
    <Icon onClick={onClick} icon={icon} bgColor="white" className={className} />
  )
}
