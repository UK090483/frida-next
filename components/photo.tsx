//@ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import { useIntersection } from 'use-intersection'
import cx from 'classnames'

import { buildSrcSet, buildSrc } from '@lib/helpers'
import { m } from 'framer-motion'
import { ImageLayout } from 'types'

interface PhotoProps {
  width?: number
  height?: number
  photo: any
  srcSizes?: number[]
  sizes?: string
  layout?: ImageLayout
  hasPlaceholder?: boolean
  forceLoad?: boolean
  onLoad?: Function
  className: string
  quality: number
}

// const imageCache = Object.create({})

// const inImageCache = (props) => {
//   const cacheKey = getImageCacheKey(props)
//   return imageCache[cacheKey] || false
// }

// const activateCacheForImage = (props) => {
//   const cacheKey = getImageCacheKey(props)
//   if (cacheKey) {
//     imageCache[cacheKey] = true
//   }
// }

// const getImageCacheKey = (props) => {
//   const { photo, onLoad, ...rest } = props

//   return JSON.stringify({ id: photo.id, ...rest })
// }

// const printCache = () => {
//   console.log(imageCache)
// }

const Photo: React.FC<PhotoProps> = (props) => {
  const {
    photo,
    width,
    height,
    srcSizes = [400, 800, 1000],
    sizes = '(min-width: 940px) 50vw, 100vw',
    layout = 'intrinsic',
    quality = 80,
    hasPlaceholder = true,
    forceLoad,
    onLoad,
    className,
  } = props

  if (!photo) return null

  const imageRef = useRef()
  const [isLoaded, setIsLoaded] = useState(false)
  const isIntersecting = useIntersection(imageRef, {
    once: true,
    threshold: 0.1,
  })
  useEffect(() => {
    // printCache()
    // !inImageCache(props) && setIsLoaded(false)
  }, [])

  // define our aspect ratio if not a background fill
  const aspect =
    typeof width === 'number' && typeof height === 'number'
      ? (height / width) * 100
      : 100 / (photo.customRatio || photo.aspectRatio)

  const aspectCustom =
    layout === 'intrinsic' ? { paddingTop: `${aspect}%` } : null

  // define our src and srcset
  const src = buildSrc(photo, { width, height, quality })

  const srcset = buildSrcSet(photo, {
    srcSizes,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(quality ? { quality } : {}),
    ...(aspect ? { aspect } : {}),
  })

  // handle our image onLoad
  function handleLoad() {
    requestAnimationFrame(() => {
      if (!isLoaded) setIsLoaded(true)
    })
  }

  // trigger any onLoad callbacks
  useEffect(() => {
    if (isLoaded && onLoad) onLoad()
  }, [isLoaded])

  return (
    <figure className={className ? className : null} layoutId="image">
      <div
        className={cx('ar', {
          'has-fill': layout === 'fill' || layout === 'contain',
        })}
        style={aspectCustom}
      >
        <picture>
          <img
            draggable="false"
            ref={imageRef}
            width={width}
            height={height}
            src={forceLoad || isIntersecting ? src : null}
            srcSet={forceLoad || isIntersecting ? srcset : null}
            sizes={sizes}
            decoding="async"
            onLoad={handleLoad}
            alt={photo.alt || photo.asset?.altText}
            className={cx(getSize(layout), { 'is-loaded': isLoaded })}
          />
        </picture>

        {hasPlaceholder && (
          <div
            className={cx('ar--placeholder ', {
              'is-loaded': isLoaded,
            })}
          >
            <img
              src={photo.lqip}
              alt={photo.alt || photo.asset?.altText}
              role="presentation"
            />
          </div>
        )}
      </div>
    </figure>
  )
}

const getSize = (layout: ImageLayout) => {
  switch (layout) {
    case 'intrinsic':
      return 'object-cover'
    case 'fill':
      return 'object-cover'
    case 'contain':
      return 'object-contain'
  }
}

export default Photo
