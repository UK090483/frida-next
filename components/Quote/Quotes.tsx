import ButtonNav from '@components/CarussellHero/ButtonNav'
import { QuoteResult, QuotesBlockResult } from 'pageBuilder/Blocks/QuotesBlock'
import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Quote from './Quote'

type QuotesBlock = {
  items: QuoteResult[]
}

const Quotes: React.FC<QuotesBlock> = ({ items }) => {
  const [state, setState] = React.useState(0)
  const carousel = React.useRef<null | Carousel>(null)
  const [swiping, setSwiping] = React.useState(false)
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

  React.useEffect(() => {
    if (typeof window === `undefined` && hasMultiple) return
    const interval = setInterval(() => {
      setNext()
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [items.length, state])

  if (!hasMultiple && items.length === 1) {
    return (
      <div className="pb-6 bg-frida-black" data-color={'black'}>
        <Quote {...items[0]} />
      </div>
    )
  }

  return (
    <div className="relative " data-color={'black'}>
      <Carousel
        infinite={true}
        ssr={true}
        ref={carousel}
        beforeChange={(number) => {
          setSwiping(true)
          onChange(number)
        }}
        afterChange={() => {
          setSwiping(false)
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
          <Quote {...item} key={index} isSwiping={swiping} />
        ))}
      </Carousel>

      <ButtonNav
        className=" bg-frida-black pb-2 pl-frida_side md:pl-6"
        setNext={setNext}
        setPrev={setPrev}
      />
    </div>
  )
}

export default Quotes
