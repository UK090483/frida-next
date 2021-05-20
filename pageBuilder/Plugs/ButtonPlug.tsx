import React from 'react'
import Button from '@components/lib/buttons/button'

import { FridaColors } from 'types'

export const buttonPlugQuery = ` 
_type == "button" => {
    label,
    bgColor,
    color,
    inline,
    link,
    'internalLink' :internalLink->{"type":_type,'slug':slug.current}
}
`

export type ButtonPlugResult = {
  label: string | null
  label_en: string | null
  internalLink: { slug: string; type: string } | null
  link: string | null
  color: FridaColors | null
  bgColor: FridaColors | null
  position?: 'inline' | 'left' | 'right' | 'center'
}

interface ButtonPlugProps extends ButtonPlugResult {}
const ButtonPlug: React.FC<ButtonPlugProps> = (props) => {
  const { internalLink, link, color, bgColor, label, position } = props

  const _link = !!internalLink ? buildLink(internalLink) : !!link ? link : '/'
  const _type = !!internalLink ? 'link' : !!link ? 'externalLink' : 'link'

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

const buildLink = (link: { type: string; slug: string }) => {
  const { type, slug } = link

  if (type === 'artwork') {
    return `/artwork/${slug}`
  }

  if (type === 'page') {
    return `/${slug}`
  }

  return '/'
}
