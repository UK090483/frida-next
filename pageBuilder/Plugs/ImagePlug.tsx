import Photo from '@components/Photo'
import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import classNames from 'classnames'
import React from 'react'
import { FridaSizes } from 'types'
export const imagePlugQuery = ` 
_type == "imagePlug" => {
  ...,
  _type,
  _key,
  'image':asset->,
   ${imageMeta},
   customWidth,
   customHeight,
}
`
export interface ImagePlugResult extends ImageMetaResult {
  _type: 'imagePlug'
  _key: string
  customWidth?: FridaSizes | null
  customHeight?: FridaSizes | null
  layout?: 'fill' | 'contain'
  photo: any
}

const ImagePlug: React.FC<ImagePlugResult> = (props) => {
  const { customWidth, customHeight, layout = 'contain', ...rest } = props

  const _layout = customHeight ? layout : 'intrinsic'

  return (
    <Photo
      width={50}
      photo={rest}
      layout={_layout}
      className={classNames(
        { 'w-full mx-auto': !customWidth },
        { 'mx-auto w-full': !!customWidth },
        { 'w-full xs:max-w-sm ': customWidth === 's' },
        { 'w-full xs:max-w-md': customWidth === 'm' },
        { 'w-full xs:max-w-lg': customWidth === 'l' },
        { 'w-full   xs:max-w-3xl': customWidth === 'xl' },
        { 'w-full  xs:max-w-7xl': customWidth === 'xxl' },
        { 'h-vh/5': customHeight === 's' },
        { 'h-vh/4': customHeight === 'm' },
        { 'h-vh/3': customHeight === 'l' },
        { 'h-vh/2': customHeight === 'xl' },
        { 'h-vh': customHeight === 'xxl' }
      )}
    />
  )
}

export default ImagePlug
