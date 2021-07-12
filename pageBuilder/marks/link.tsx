import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import React from 'react'
import { buildInternalLink } from '@lib/helper/buildInternalLink'
import Link from 'next/link'
import Icon from '@components/Icon'

type LinkMarkPros = {
  internalLink?: { type: string; slug: string }
  link?: string
  asButton?: boolean
}

export const linkMarkQuery = `
_type == "link" => {
    
    'internalLink': link.internalLink->{'type':_type, 'slug':slug.current},
    'link':link.link,
    asButton,
  }`

const LinkMark: React.FC<LinkMarkPros> = (props) => {
  const { link, internalLink, asButton } = props

  const _internalLink = internalLink && buildInternalLink(internalLink)

  if (_internalLink) {
    return (
      <Link href={_internalLink} passHref>
        <a {...mouseLinkProps} className="text-frida-red underline">
          {asButton ? <InlineIcon /> : props.children}
        </a>
      </Link>
    )
  }

  return (
    <a
      {...mouseLinkProps}
      target="_blank"
      rel="noreferrer"
      href={link || '/'}
      className="text-frida-red underline"
    >
      {asButton ? <InlineIcon /> : props.children}
    </a>
  )
}

export default LinkMark

const InlineIcon = () => {
  return (
    <span className="inline-block   h-[1em] transform translate-y-[-0.2em] ">
      <Icon icon="arrowRight" bgColor="grey" />
    </span>
  )
}
