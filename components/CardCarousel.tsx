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

const Carousel: React.FC<CarouselProps> = ({
  items = [],
  responsive = defaultResponsive,
  bgColor = 'grey',
  header,
}) => {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1.5,
    mode: 'snap',
    breakpoints: responsive,
  })

  const setNext = () => {
    slider.next()
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

        <CustomArrow onClick={setNext} />
      </div>
    </Section>
  )
}

export default Carousel

type CustomArrowProps = {
  onClick: () => void
}

const CustomArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <Icon
      onClick={onClick}
      icon="arrowRight"
      bgColor="white"
      className="absolute transform -translate-y-1/2 top-1/2 right-2 md:right-5"
    />
  )
}
