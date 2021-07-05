import React, { useRef } from 'react'
import { useIntersection } from 'use-intersection'
import Marq from 'react-fast-marquee'
import Photo from '@components/Photo'
import { FridaColors, FridaLocation } from 'types'
import { ImageMetaResult } from '@lib/queries/snippets'

type TextItem = {
  _type: 'simple'
  text: string
  text_en?: string
}
type imageItem = {
  _type: 'photo'
  photo: null | ImageMetaResult
}

interface MarqueeProps {
  data: {
    items?: (imageItem | TextItem)[]
    speed?: null | number
    reverse?: null | boolean
    pauseable?: null | boolean
    bgColor?: FridaColors
    bgColorHover?: FridaColors
    color?: FridaColors
    colorHover?: FridaColors
  }
  lang: FridaLocation
}

const Marquee: React.FC<MarqueeProps> = ({ data = {}, lang }) => {
  const {
    items = [],
    speed,
    reverse,
    pauseable,
    bgColor = 'white',
    bgColorHover = 'white',
    color = 'black',
    colorHover = 'black',
  } = data

  const marqueeRef = useRef<HTMLDivElement | null>(null)
  const isIntersecting = useIntersection(marqueeRef, {
    once: true,
    threshold: 0.1,
  })

  return (
    <div
      ref={marqueeRef}
      className={`bg-frida-${bgColor} transition-colors duration-500 hover:bg-frida-${bgColorHover} text-frida-${color} hover:text-frida-${colorHover}`}
    >
      <Marq
        speed={speed ? speed * 200 : 100}
        direction={reverse ? 'right' : 'left'}
        pauseOnHover={pauseable || false}
        gradient={false}
        className="py-3"
      >
        {[...items, ...items, ...items, ...items].map((item, key) => {
          switch (item._type) {
            case 'simple':
              return (
                <div
                  key={key}
                  className={`header-small w-fit-content flex items-center`}
                >
                  {lang === 'en' && item.text_en ? item.text_en : item.text}
                </div>
              )
            case 'photo':
              return (
                <div
                  key={key}
                  className="relative  w-vw/3 md:w-vw/6  "
                  style={{ flex: item.photo?.aspectRatio }}
                >
                  <Photo
                    loading="eager"
                    photo={item.photo}
                    hasPlaceholder={false}
                    forceLoad={isIntersecting}
                  />
                </div>
              )
          }
        })}
      </Marq>
    </div>
  )
}

export default Marquee
