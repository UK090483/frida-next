/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @next/next/no-img-element */

import {
  buildSrc,
  // buildSrcSet
} from '@lib/helpers'
import { ImageMetaResult } from '@lib/queries/snippets'
import React, { useRef, useState, useEffect } from 'react'
import { setMouse } from '../generic/Mouse/mouseRemote'
const SCALE = [2, 3]

type ProductMagnifyImageProps = {
  alt?: string
  photo: ImageMetaResult | null | undefined
}

const ProductMagnifyImage: React.FC<ProductMagnifyImageProps> = ({
  alt,
  photo,
}) => {
  const imageRef = useRef<null | HTMLImageElement>(null)
  const RootRef = useRef<null | HTMLDivElement>(null)
  const loupImageRef = useRef<null | HTMLImageElement>(null)

  const aspectRatio = photo?.aspectRatio || 0.5
  const isLandscape = aspectRatio > 1

  const bigImageSrc = photo && buildSrc(photo, { width: 1200 })
  const smallImageSrc = photo && buildSrc(photo, {})
  // const smallImageSrcset = buildSrcSet(photo, { ...ARTWORK_IMAGE_PROPS })

  useEffect(() => {
    const loupImage = loupImageRef.current
    const handleLoad = () => {
      if (imageRef.current && bigImageSrc) {
        imageRef.current.src = bigImageSrc
      }
    }

    if (loupImage) {
      loupImage.addEventListener('load', handleLoad)
    }
    return () => {
      loupImage && loupImage.removeEventListener('load', handleLoad)
    }
  }, [loupImageRef, imageRef, bigImageSrc])
  useEffect(() => {
    return () => {
      setMouse('hide', false)
    }
  }, [])

  const [showGlass, setShowGlass] = useState(false)
  const [pos, setPos] = useState({
    left: 0,
    top: 0,
    x: 50,
    y: 50,
    pageX: 0,
    pageY: 0,
    width: 0,
    height: 0,
  })
  const [scale, setScale] = useState(0)

  const handleClick = () => {
    setScale((scale + 1) % SCALE.length)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const imageClientRef = imageRef.current?.getBoundingClientRect()
    if (!imageClientRef) return
    const { left, width, height, top } = imageClientRef
    const { pageX, pageY } = e
    const x = ((pageX - left) / (width - 20)) * -100
    const y = ((pageY - window.scrollY - top) / height) * -100

    setPos({
      left: left,
      top,
      width,
      height,
      x,
      y,
      pageX,
      pageY,
    })
  }

  return (
    <div
      className="w-full h-full  flex-shrink-1 flex justify-center items-center"
      ref={RootRef}
    >
      {smallImageSrc && (
        <img
          className={`${
            isLandscape ? 'max-w-full w-full' : 'max-h-full h-full'
          }`}
          onMouseMove={(e) => {
            handleMouseMove(e)
          }}
          onMouseEnter={() => {
            setShowGlass(true)
            setMouse('hide', true)
          }}
          onMouseLeave={() => {
            setShowGlass(false)
            setMouse('hide', false)
          }}
          onClick={handleClick}
          ref={imageRef}
          src={smallImageSrc}
          alt={alt}
        ></img>
      )}

      <div
        className={` w-40 h-40 absolute top-0 left-0 overflow-hidden rounded-full pointer-events-none border-frida-red border-4 transform -translate-x-20 -translate-y-20 transition-opacity  ${
          showGlass ? ' scale-100 opacity-100' : 'w-0 h-0 scale-0 opacity-0'
        }`}
        style={{ left: `${pos.pageX}px`, top: `${pos.pageY}px` }}
      >
        {bigImageSrc && (
          <img
            ref={loupImageRef}
            style={{
              width: `${pos.width * SCALE[scale]}px`,
              height: `${pos.height * SCALE[scale]}px`,
              transform: ` translateX(${pos.x}%) translateY(${pos.y}%)`,
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              maxWidth: '1000%',
            }}
            src={bigImageSrc}
            alt={alt}
          ></img>
        )}
      </div>
    </div>
  )
}

export default ProductMagnifyImage
