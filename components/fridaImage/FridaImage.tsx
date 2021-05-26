import Photo from '@components/photo'
import * as React from 'react'
import { ImageLayout } from 'types'
interface IFridaImageProps {
  type?: 'sanity' | 'shopify' | 'auto'
  style?: React.CSSProperties
  imgStyle?: React.CSSProperties
  sanityAssetId?: string
  photo: any
  shopifyImages?: any[]
  layoutId?: string
  layout?: ImageLayout
  width?: number
  quality?: number
  className?: string
  srcSizes?: number[]
  alt?: string
}

const FridaImage: React.FunctionComponent<IFridaImageProps> = (props) => {
  const {
    style = {},
    imgStyle = {},
    type = 'sanity',
    sanityAssetId,
    photo,
    srcSizes,
    shopifyImages,
    layoutId,
    layout = 'intrinsic',
    width,
    quality = 80,
    className = '',
    alt,
  } = props

  if (!photo) return null

  return (
    <Photo
      alt={alt}
      srcSizes={srcSizes}
      photo={photo}
      width={width}
      className={className}
      layout={layout}
      quality={quality}
    />
  )
}

export default FridaImage

export const ARTWORK_IMAGE_PROPS = {
  srcSizes: [400, 500],
  width: 500,
  quality: 80,
}
