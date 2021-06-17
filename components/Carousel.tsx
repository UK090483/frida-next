import * as React from 'react'
import _Carousel, { ResponsiveType } from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FridaColors } from 'types'
import Section from './Section'

import Icon from './Icon'

type CarouselProps = {
  items: React.ReactElement[]
  responsive?: ResponsiveType
  bgColor?: FridaColors
  header?: string | null | undefined
}
const defaultResponsive: ResponsiveType = {
  xxl: {
    breakpoint: { max: 3300, min: 2040 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  xl: {
    breakpoint: { max: 2040, min: 1600 },
    items: 3,
    partialVisibilityGutter: 80,
  },
  lg: {
    breakpoint: { max: 1600, min: 1200 },
    items: 2,
    partialVisibilityGutter: 100,
  },
  md: {
    breakpoint: { max: 1200, min: 640 },
    items: 2,
    partialVisibilityGutter: 70,
  },
  sm: {
    breakpoint: { max: 640, min: 480 },
    items: 1,
    partialVisibilityGutter: 150,
  },
  xs: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
    partialVisibilityGutter: 100,
  },
}

const Carousel: React.FC<CarouselProps> = ({
  items = [],
  responsive = defaultResponsive,
  bgColor = 'grey',
  header,
}) => {
  const [swiping, setSwiping] = React.useState(false)

  const carousel = React.useRef<null | _Carousel>(null)

  const setNext = () => {
    if (carousel.current) {
      carousel.current.next(0)
    }
  }

  return (
    <Section type="full" backgroundColor="white">
      {header && (
        <div
          className={`text-lg-fluid  bg-frida-${bgColor} font-bold px-frida_7% pt-14`}
        >
          {header}
        </div>
      )}
      <div className={`bg-frida-${bgColor}  py-3 md:py-12 relative`}>
        <_Carousel
          deviceType="sm"
          ssr
          beforeChange={() => {
            setSwiping(true)
          }}
          afterChange={() => {
            setSwiping(false)
          }}
          partialVisible={true}
          ref={carousel}
          infinite={true}
          customRightArrow={<></>}
          customLeftArrow={<></>}
          draggable={true}
          showDots={false}
          responsive={responsive}
          itemClass="pb-0 -my-10 md:my-0"
        >
          {items.map((item, index) =>
            React.cloneElement(item, { key: index, isSwiping: swiping })
          )}
        </_Carousel>
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
      bgColor="pink"
      className="absolute transform -translate-y-1/2  top-1/2 right-2 md:right-5"
    />
  )
}
