import React from 'react'

import FridaImage from '@components/fridaImage/FridaImage'
import { ImageLayout } from 'types'

type ImageParserProps = {
  style?: React.CSSProperties
  imgStyle?: React.CSSProperties
  image: any | undefined
  draggable?: boolean
  photo?: any
  layout?: ImageLayout
}

const ImageParser: React.FC<ImageParserProps> = (props) => {
  const {
    image,
    style,
    draggable = false,
    imgStyle,
    photo,
    layout = 'intrinsic',
  } = props

  if (!image) return <></>

  const hotspotStyle: React.CSSProperties = { objectFit: 'cover' }

  if (image.hotspot) {
    hotspotStyle.objectPosition = `${image.hotspot.x * 100}% ${
      image.hotspot.y * 100
    }%`
  }

  return (
    <FridaImage
      imgStyle={{ ...hotspotStyle, ...imgStyle }}
      sanityAssetId={image?.asset?._ref}
      photo={photo}
      type="sanity"
      layout={layout}
    />
  )
}

export default ImageParser
