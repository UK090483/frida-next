/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @next/next/no-img-element */

import Photo from '@components/Photo'
import { ImageMetaResult } from '@lib/queries/snippets'
import React, { useRef, useState, useEffect } from 'react'
import { setMouse } from '../generic/Mouse/mouseRemote'

const SCALE = [2, 3]
const size = 70

type ProductMagnifyImageProps = {
  alt?: string
  photo: ImageMetaResult | null | undefined
}

const ProductMagnifyImage: React.FC<ProductMagnifyImageProps> = ({
  alt,
  photo,
}) => {
  const imageRef = useRef<null | HTMLImageElement>(null)

  useEffect(() => {
    return () => {
      setMouse('hide', false)
    }
  }, [])

  const [showGlass, setShowGlass] = useState(false)
  const [pos, setPos] = useState({
    left: 0,
    top: 0,
    Xpx: 0,
    Ypx: 0,
    pageX: 0,
    pageY: 0,
    width: 0,
    height: 0,
    timeStamp: 0,
  })

  const [scale] = useState(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { pageX, pageY, timeStamp } = e
    if (timeStamp - pos.timeStamp < 50) return
    const imageClientRef = imageRef.current?.getBoundingClientRect()
    if (!imageClientRef) return
    const { left, width, height, top } = imageClientRef
    const Xpx = (pageX - left) * SCALE[scale] * -1 + size
    const Ypx = (pageY - window.scrollY - top) * SCALE[scale] * -1 + size

    setPos({
      left,
      top,
      width,
      height,
      Xpx,
      Ypx,
      pageX,
      pageY,
      timeStamp,
    })
  }

  return (
    <>
      <div
        ref={imageRef}
        onMouseEnter={() => {
          setShowGlass(true)
          setMouse('hide', true)
        }}
        onMouseLeave={() => {
          setShowGlass(false)
          setMouse('hide', false)
        }}
        // onClick={handleClick}
        onMouseMove={(e) => {
          handleMouseMove(e)
        }}
        className={`relative w-full h-[550px] lg:h-full`}
      >
        <Photo
          alt={alt}
          photo={photo}
          layout="contain"
          sizes={'(min-width: 640px) 50vw'}
        />
      </div>
      <div
        className={` w-40 h-40 absolute top-0 left-0 overflow-hidden  rounded-full pointer-events-none border-frida-red border-4 transform  transition-opacity  ${
          showGlass ? ' scale-100 opacity-100' : 'w-0 h-0 scale-0 opacity-0'
        }`}
        style={{
          left: `${pos.pageX - size}px`,
          top: `${pos.pageY - size}px`,
        }}
      >
        {showGlass && (
          <div
            style={{
              width: `${pos.width * SCALE[scale]}px`,
              height: `${pos.height * SCALE[scale]}px`,
              transform: `translateX(${pos.Xpx}px) translateY(${pos.Ypx}px)`,
              position: 'absolute',
            }}
          >
            <Photo alt={alt} photo={photo} layout="contain" />
          </div>
        )}
      </div>
    </>
  )
}

export default ProductMagnifyImage
