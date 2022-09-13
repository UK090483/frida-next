import ButtonNav from '@components/buttons/ButtonNav'
import { useKeenSlider } from 'keen-slider/react'
import { QuoteResult } from 'pageBuilder/Blocks/QuotesBlock/QuotesBlock.query'

import React from 'react'
import Quote from './Quote'

type QuotesBlock = {
  items: QuoteResult[]
}

const Quotes: React.FC<QuotesBlock> = ({ items }) => {
  const hasMultiple = items.length > 1

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1,
    loop: true,
    mode: 'snap',
  })

  const setNext = () => {
    slider && slider.next()
  }

  const setPrev = () => {
    slider && slider.prev()
  }

  React.useEffect(() => {
    if (typeof window === `undefined` && hasMultiple) return
    const interval = setInterval(() => {
      slider && slider.next()
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [hasMultiple, slider])

  if (!hasMultiple && items.length === 1) {
    return (
      <div className="pb-6 bg-frida-black" data-color={'black'}>
        <Quote {...items[0]} />
      </div>
    )
  }

  return (
    <div className="relative " data-color={'black'}>
      <div ref={sliderRef} className="keen-slider">
        {items.map((item, index) => (
          <div key={index} className="keen-slider__slide">
            <Quote {...item} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-frida_side md:bottom-12  pl-frida_side md:pl-12 ">
        <ButtonNav setNext={setNext} setPrev={setPrev} />
      </div>
    </div>
  )
}

export default Quotes
