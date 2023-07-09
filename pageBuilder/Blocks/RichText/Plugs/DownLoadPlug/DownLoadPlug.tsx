import React from 'react'
import Button from '@components/buttons/button'
import { DownloadPlugResult } from './DownLoadPlug.query'

const DownloadPlug: React.FC<DownloadPlugResult> = (props) => {
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
