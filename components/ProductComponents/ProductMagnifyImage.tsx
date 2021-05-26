import { ARTWORK_IMAGE_PROPS } from '@components/fridaImage/FridaImage'
import { buildSrc, buildSrcSet } from '@lib/helpers'
import React, { useRef, useState, useEffect } from 'react'
import { setMouse } from '../generic/Mouse/mouseRemote'
const SCALE = [2, 3]

type ProductMagnifyImageProps = {
  alt?: string
  photo: any
}

const ProductMagnifyImage: React.FC<ProductMagnifyImageProps> = ({
  alt,
  photo,
}) => {
  const imageRef = useRef<null | HTMLImageElement>(null)
  const RootRef = useRef<null | HTMLDivElement>(null)
  const loupImageRef = useRef<null | HTMLImageElement>(null)

  if (!photo) return null

  const { aspectRatio } = photo

  const isLandscape = aspectRatio > 1

  const bigImageSrc = buildSrc(photo, { width: 1200 })
  const smallImageSrc = buildSrc(photo, { ...ARTWORK_IMAGE_PROPS })
  const smallImageSrcset = buildSrcSet(photo, { ...ARTWORK_IMAGE_PROPS })

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

  const handleMouseMove = (e: MouseEvent) => {
    const imageClientRef = imageRef.current?.getBoundingClientRect()

    if (!imageClientRef) return

    let x = ((e.pageX - imageClientRef.left) / imageClientRef.width) * -100
    let y =
      ((e.pageY - window.scrollY - imageClientRef.top) /
        imageClientRef.height) *
      -100
    setPos({
      width: imageClientRef.width,
      height: imageClientRef.height,
      x: x,
      y: y,
      pageX: e.pageX,
      pageY: e.pageY - window.scrollY - imageClientRef.top + 100,
      // pageYn: e.pageY,
    })
  }

  return (
    <div
      className="w-full h-full  flex-shrink-1 flex justify-center items-center "
      ref={RootRef}
    >
      {smallImageSrc && (
        <img
          className={`${
            isLandscape ? 'max-w-full w-full' : 'max-h-full h-full'
          } border-3 border-frida-red `}
          onMouseMove={(e: any) => {
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
          // width={isLandscape ? 'auto' : '100%'}
          // height={isLandscape ? '100%' : 'auto'}
          // height={100}
          onClick={handleClick}
          ref={imageRef}
          src={smallImageSrc}
          alt={alt}
        ></img>
      )}

      <div
        className={` w-40 h-40 absolute top-0 left-0 overflow-hidden rounded-full pointer-events-none border-frida-red border-4 transform -translate-x-20 -translate-y-20 transition-all  ${
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
              top: '98.5px',
              left: '98.5px',
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
