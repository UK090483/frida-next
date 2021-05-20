import React from 'react'
import Image from 'next/image'
import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import FridaImage from '@components/fridaImage/FridaImage'
import Photo from '@components/photo'
import classNames from 'classnames'
import { FridaSizes } from 'types'
import { imageBuilder } from '@lib/sanity'
import FPhoto from '@components/fPoto'
export const imagePlugQuery = ` 
_type == "imagePlug" => {
  ...,
  'cass':asset->,
   ${imageMeta},
   customWidth,
   customHeight,
}
`

export interface ImagePlugResult extends ImageMetaResult {
  customWidth?: FridaSizes | null
  customHeight?: FridaSizes | null
}

const ImagePlug: React.FC<ImagePlugResult> = (props) => {
  const { customWidth, customHeight, ...rest } = props

  const s = imageBuilder.image(rest).width(sizeToWidth(customWidth)).url()
  if (!s) return <div></div>
  return (
    <div
      className={classNames(
        { 'w-full mx-auto': !customWidth },
        { 'mx-auto md:full': !!customWidth },
        { 'w-full md:w-1/6 ': customWidth === 's' },
        { 'w-full md:w-1/4 ': customWidth === 'm' },
        { 'w-full md:w-1/2 ': customWidth === 'l' },
        { 'w-full md:w-3/4 ': customWidth === 'xl' },
        { 'w-full md:w-2/3 ': customWidth === 'xxl' },
        { 'h-vh/5': customHeight === 's' },
        { 'h-vh/4': customHeight === 'm' },
        { 'h-vh/3': customHeight === 'l' },
        { 'h-vh/2': customHeight === 'xl' },
        { 'h-vh': customHeight === 'xxl' }
      )}
    >
      <img
        src={s}
        className={classNames('w-full', {
          'object-cover w-full h-full': !!customWidth && !!customHeight,
        })}
      />
    </div>
  )
}

const sizeToWidth = (width: FridaSizes | null | undefined) => {
  if (!width) return 1000

  const sizes = {
    s: 300,
    m: 600,
    l: 800,
    xl: 1200,
    xxl: 1400,
  }
  return sizes[width] | 1000
}
export default ImagePlug
