import React from 'react'
import Button from '@components/buttons/button'
import { buildInternalLink } from 'utility/buildInternalLink'
import { ButtonPlugResult } from './ButtonPlug.query'

const ButtonPlug: React.FC<ButtonPlugResult> = (props) => {
  const { internalLink, link, color, bgColor, label, position } = props

  const _link = internalLink
    ? buildInternalLink(internalLink)
    : link
    ? link
    : '/'
  const _type = internalLink ? 'link' : link ? 'externalLink' : 'link'

  return (
    <Button
      color={color || 'black'}
      backgroundColor={bgColor || 'white'}
      type={_type}
      link={_link}
      label={label || 'label'}
      position={position || 'inline'}
    />
  )
}

export default ButtonPlug
