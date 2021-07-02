import React from 'react'
import Button from '@components/buttons/button'

import { FridaColors } from 'types'
import { buildInternalLink } from '@lib/helper/buildInternalLink'

export const buttonPlugQuery = ` 
_type == "button" => {
  _type,
  _key,
    label,
    bgColor,
    color,
    inline,
    link,
    'internalLink' :internalLink->{"type":_type,'slug':slug.current}
}
`

export type ButtonPlugResult = {
  _key: string
  _type: 'button'
  label: string | null
  label_en: string | null
  internalLink: { slug: string; type: string } | null
  link: string | null
  color: FridaColors | null
  bgColor: FridaColors | null
  position?: 'inline' | 'left' | 'right' | 'center'
}

type ButtonPlugProps = ButtonPlugResult
const ButtonPlug: React.FC<ButtonPlugProps> = (props) => {
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
