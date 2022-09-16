/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Frida from '@components/Frida'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
// import { useModalContext } from '@lib/modalContext'
import { ImageMetaResult } from 'pageBuilder/queries/snippets'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import classNames from 'classnames'
import { GalleryTypes } from 'types'
import Photo from './Photo'

interface CardWrapPros {
  galleryType: GalleryTypes
  isSwiping?: boolean
  slug: string
  layout?: 'contain' | 'fill'
  type: 'artwork' | 'artist' | 'post' | 'product'
  l?: 'fixed-contain' | 'fixed-fill' | 'intrinsic'
  photo: ImageMetaResult | null
  title?: string
  alt?: string
  banner?: React.ReactElement | undefined
  ariaLabel?: string
  badge?: string
}

const CardWrap: React.FC<CardWrapPros> = (props) => {
  const {
    slug,
    isSwiping,
    children,
    type,
    photo,
    galleryType,
    layout = 'contain',
    title,
    alt,
    banner,
    ariaLabel,
    badge,
  } = props

  const router = useRouter()

  const isCarousel = galleryType === 'carousel'
  const isGrid = galleryType === 'grid'
  const isMasonry = galleryType === 'masonry'

  return (
    <Link href={`/${type}/${slug}`} passHref>
      <a
        aria-label={ariaLabel}
        draggable={false}
        {...mouseLinkProps}
        className={classNames(
          `block mx-auto w-full  bg-frida-white relative`,
          { 'px-frida_side md:px-6 max-w-lg': isGrid || isMasonry },
          { 'mb-8': isGrid },
          { 'mb-20': isMasonry },
          {
            'p-4 transform scale-75 lg:scale-100  max-w-[340px] ': isCarousel,
          }
        )}
        onClick={(e) => {
          e.preventDefault()
          if (!isSwiping) {
            router.push(`/${type}/${slug}`, `/${type}/${slug}`, {
              scroll: false,
            })
          }
        }}
      >
        {badge && (
          <div
            className={classNames(
              'absolute z-[1] flex transform ',
              'items-center justify-center',
              'w-12 h-12 rounded-full',
              'top-3 right-3 bg-frida-pink',
              { 'right-9': isMasonry }
            )}
          >
            {badge}
          </div>
        )}
        <div
          className={classNames(
            { 'aspect-w-9 aspect-h-12': isCarousel },
            { 'w-full': isMasonry },
            { 'aspect-w-9 aspect-h-12': isGrid }
          )}
        >
          <Photo
            sizes="(min-width: 640px) 30vw"
            photo={photo}
            layout={isCarousel || isGrid ? layout : 'intrinsic'}
            alt={alt || type}
            maxWidth={isCarousel ? 420 : 800}
          />
        </div>

        {title && (
          <div
            className={`h-8 items-center text-sm-fluid truncate text-frida-pink font-bold mt-4`}
          >
            <Frida text={title} textColor={'pink'} />
          </div>
        )}
        {children}
        {banner && banner}
      </a>
    </Link>
  )
}

export default CardWrap
