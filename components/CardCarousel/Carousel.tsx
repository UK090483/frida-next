import { ArrowRightIcon } from '@heroicons/react/solid'
import * as React from 'react'
import Carousel, { ResponsiveType } from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FridaColors } from 'types'
import Section from '../container/section'
import { mouseLinkProps } from '../generic/Mouse/mouseRemote'

type ArtworkCarouselProps = {
  items: React.ReactElement[]
  responsive?: ResponsiveType
  bgColor?: FridaColors
}

const ArtworkCarousel: React.FC<ArtworkCarouselProps> = ({
  items = [],
  responsive = defaultResponsive,
  bgColor = 'grey',
}) => {
  const [state, setState] = React.useState(0)
  const [swiping, setSwiping] = React.useState(false)

  const carousel = React.useRef<null | Carousel>(null)

  React.useEffect(() => {
    if (carousel) {
    }
  }, [carousel])

  const onChange = (value: number) => {
    setState(value)
  }

  const setNext = () => {
    if (carousel.current) {
      carousel.current.next(0)
    }
  }

  const setPrev = () => {
    setState((state === 0 ? 2 : state - 1) % items.length)
  }

  return (
    <Section type="full" backgroundColor="white">
      <div className={`bg-frida-${bgColor} pt-16 pb-16 relative`}>
        <Carousel
          beforeChange={(number) => {
            setSwiping(true)
            onChange(number)
          }}
          afterChange={() => {
            setSwiping(false)
          }}
          partialVisible={true}
          ref={carousel}
          // infinite={true}
          customRightArrow={<></>}
          customLeftArrow={<></>}
          draggable={true}
          showDots={false}
          responsive={responsive}
          itemClass="pb-0"
          infinite={true}
        >
          {items.map((item, index) =>
            React.cloneElement(item, { key: index, isSwiping: swiping })
          )}
        </Carousel>
        <CustomArrow onClick={setNext} />
      </div>
    </Section>
  )
}

export default ArtworkCarousel

type CustomArrowProps = {
  onClick: () => void
}

const CustomArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <ArrowRightIcon
      {...mouseLinkProps}
      onClick={onClick}
      className="absolute bg-frida-pink right-6 top-1/2 w-12 rounded-full border-frida-pink border-8 "
    />
  )
}

const defaultResponsive: ResponsiveType = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2000 },
    items: 4,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1700 },
    items: 3,
    partialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1700, min: 1000 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 1000, min: 0 },
    items: 1,
    partialVisibilityGutter: 100,
  },
}
