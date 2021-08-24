import React from 'react'
import Button from '@components/buttons/button'

import { FridaColors } from 'types'

export const downloadPlugQuery = ` 
_type == "download" => {

  _type,
  _key,
    label,
    bgColor,
    color,
    'imageSrc':image.asset->url,
    'fileSrc':file.asset->url,
    'test':'blaa'
}
`

export type DownloadPlugResult = {
  _key: string
  _type: 'download'
  label: string | null
  imageSrc: string | null
  fileSrc: string | null
  color: FridaColors | null
  bgColor: FridaColors | null
  position?: 'inline' | 'left' | 'right' | 'center'
}

type ButtonPlugProps = DownloadPlugResult
const DownloadPlug: React.FC<ButtonPlugProps> = (props) => {
  const { imageSrc, fileSrc, color, bgColor, label, position } = props
  const src = imageSrc || fileSrc
  const link = src ? `/api/downloadFile/?path=${src}` : ''

  return (
    <Button
      color={color || 'black'}
      backgroundColor={bgColor || 'white'}
      type="download"
      link={link}
      label={label || 'Download'}
      position={position || 'inline'}
    />
  )
}

export default DownloadPlug
