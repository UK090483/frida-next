import React from 'react'
import Button from '@components/lib/buttons/button'

const ButtonPlug = (props: any) => {
  const { internalLink, link, color, bgColor, label, inline } = props

  const _type =
    internalLink || link
      ? internalLink
        ? 'link'
        : 'externalLink'
      : 'externalLink'

  const _link =
    internalLink || link ? (internalLink ? buildLink(internalLink) : link) : '/'
  return <div>button</div>
  return (
    <Button
      color={color || 'black'}
      backgroundColor={bgColor}
      type={_type}
      link={_link}
      label={label || 'label'}
      inline={inline}
    />
  )
}

export default ButtonPlug

const buildLink = (link: any) => {
  if (link._type === 'artwork') {
    return `/artwork/${link?.slug?.current}`
  }

  if (link._type === 'page') {
    return `/${link?.slug?.current}`
  }
}
