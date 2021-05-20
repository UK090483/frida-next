import sanityClient, { ClientConfig } from '@sanity/client'
import Img from 'next/image'
import * as React from 'react'
import { useNextSanityImage } from 'next-sanity-image'
// import { getSanityGatsbyImageData } from './sanityImage'
// import { getFluidShopifyImage } from './shopifyImage'
import Photo from '@components/photo'
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
}

const configuredSanityClient = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_PROJECT_DATASET,
  useCdn: true,
} as ClientConfig)

const FridaImage: React.FunctionComponent<IFridaImageProps> = (props) => {
  const {
    style = {},
    imgStyle = {},
    type = 'sanity',
    sanityAssetId,
    photo,
    shopifyImages,
    layoutId,
    layout = 'intrinsic',
    width,
    quality = 80,
    className = '',
  } = props

  if (!photo) return null

  return (
    <Photo
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
  width: 500,
  quality: 80,
}
