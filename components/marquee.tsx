import React, { useRef } from 'react'

import Marq from 'react-fast-marquee'
import Photo from '@components/Photo'
import { FridaColors } from 'types'
import { ImageMetaResult } from 'pageBuilder/queries/snippets'
import { useRouter } from 'next/router'
import { useIntersection } from 'react-use'

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
}

const Marquee: React.FC<MarqueeProps> = ({ data = {} }) => {
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

  // const a= useIntersection(marqueeRef,{threshold:0.1})

  // a?.isIntersecting
  const isIntersecting = true
  // const isIntersecting = useIntersection(marqueeRef, {
  //   once: true,
  //   threshold: 0.1,
  // })

  const { locale } = useRouter()

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
                  {locale === 'en' && item.text_en ? item.text_en : item.text}
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
                    maxWidth={300}
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
