import { ImageLayout } from 'types'
import Image, { ImageLoader, ImageProps } from 'next/image'

import { imageBuilder } from '@lib/sanity'
import type { ImageMetaResult } from '@lib/queries/snippets'

interface PhotoProps {
  alt?: string
  width?: number
  height?: number
  photo: ImageMetaResult | undefined | null
  srcSizes?: number[]
  sizes?: string
  layout?: ImageLayout
  hasPlaceholder?: boolean
  forceLoad?: boolean
  className?: string
  quality?: number
  loading?: 'eager' | 'lazy'
}

const customLoader: (props: { photo: ImageMetaResult }) => ImageLoader = ({
  photo,
}) => {
  const loader: ImageLoader = ({ width, quality }) => {
    return (
      imageBuilder
        .image(photo)
        .width(width)
        .quality(quality || 75)
        .url() || ''
    )
  }

  return loader
}

const Photo: React.FC<PhotoProps> = (props) => {
  const {
    alt,
    photo,
    width = 300,
    height,
    sizes = '(min-width: 640px) 100vw',
    layout = 'responsive',
    quality = 75,
    className,
    loading = 'lazy',
  } = props

  if (!photo || !photo.asset) return null
  // console.log('-----------------------------')
  // console.log(photo)
  // console.log(photo.hotspot)
  // console.log(photo.crop)

  const imageLoader = customLoader({ photo })

  const placeHolder = photo.lqip
  const _height = height || width / photo.aspectRatio

  let dynamicProps: { [k: string]: unknown } = {
    width: 300,
    height: _height,
    placeholder: 'blur',
    blurDataURL: placeHolder,
  }
  let _layout: ImageProps['layout'] = 'responsive'

  if (layout === 'contain') {
    dynamicProps = { objectFit: 'contain' }
    _layout = 'fill'
  }

  if (layout === 'fill') {
    dynamicProps = { objectFit: 'cover' }
    if (photo.hotspot && photo.crop) {
      dynamicProps.objectPosition = `${photo.hotspot.x * 100}% ${
        photo.hotspot.y * 100
      }%`
    }
    _layout = 'fill'
  }

  if (process.env.NODE_ENV === 'production') {
    dynamicProps.placeholder = 'blur'
    dynamicProps.blurDataURL = placeHolder
  }

  return (
    <Image
      loading={loading}
      {...dynamicProps}
      className={'photo ' + (className || '')}
      quality={quality}
      loader={imageLoader}
      src={photo.asset._ref}
      layout={_layout}
      alt={alt || 'image'}
      sizes={sizes}
      draggable={false}
    />
  )
}

export default Photo
