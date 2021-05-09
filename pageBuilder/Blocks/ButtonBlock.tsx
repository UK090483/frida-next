import Button from '@components/lib/buttons/button'
import React from 'react'
import { FridaColors } from 'types'

type ButtonBlockProps = {
  label: string
  color: FridaColors
  bgColor: FridaColors
  align: 'left' | 'right' | 'center'
  link?: string
  internalLink?: string
}

// TODO check external links and align
const ButtonBlock: React.FC<ButtonBlockProps> = (props) => {
  const { label, bgColor, link, color, internalLink } = props
  const type = internalLink ? 'link' : 'externalLink'
  const _link = internalLink ? internalLink : link

  console.log(props)
  return <div>Button</div>
  return (
    <Button
      color={color}
      label={label}
      backgroundColor={bgColor}
      type={type}
      link={_link || ''}
    />
  )
}

export default ButtonBlock
