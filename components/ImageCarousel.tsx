import * as React from 'react'
import { useKeenSlider } from 'keen-slider/react'

import Icon from './Icon'

type ImageCarouselProps = {
  rows: number
  rows_mobile: number
  items: React.ReactElement[]
}

type CarouselState = {
  showPrev: boolean
  showNext: boolean
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  items = [],
  rows = 1,
  rows_mobile = 1,
}) => {
  const [state, setState] = React.useState<CarouselState>({
    showPrev: false,
    showNext: true,
  })
  const { showPrev, showNext } = state
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: rows_mobile,
    mode: 'snap',
    breakpoints: {
      '(min-width: 768px)': {
        slidesPerView: rows,
      },
    },
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
  )
}

export default ImageCarousel

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
