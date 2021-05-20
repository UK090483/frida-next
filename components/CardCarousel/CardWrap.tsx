import React from 'react'
import Link from 'next/link'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import { useModalContext } from '@lib/modalContext'
import { GalleryTypes } from 'types'
import { useRouter } from 'next/router'

interface CardWrapPros {
  galleryType: GalleryTypes
  isSwiping?: boolean
  slug: string
  type: 'artwork' | 'artist' | 'post' | 'product'
}

const CardWrap: React.FC<CardWrapPros> = (props) => {
  const { slug, isSwiping, children, type } = props

  const { pushAsModal } = useModalContext()

  const router = useRouter()

  return (
    <Link href={`/${type}/${slug}`} passHref>
      <a
        draggable={false}
        {...mouseLinkProps}
        className={` block mx-auto max-w-sm  bg-frida-white p-6`}
        onClick={(e) => {
          e.preventDefault()

          !isSwiping && pushAsModal(`/${type}/${slug}`, type)
        }}
      >
        {children}
      </a>
    </Link>
  )
}

export default CardWrap
