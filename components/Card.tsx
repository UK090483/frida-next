import Frida from '@components/Frida'
import FridaImage, {
  ARTWORK_IMAGE_PROPS,
} from '@components/fridaImage/FridaImage'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import { useModalContext } from '@lib/modalContext'
import { ImageMetaResult } from '@lib/queries/snippets'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import classNames from 'classnames'
import { GalleryTypes } from 'types'

interface CardWrapPros {
  galleryType: GalleryTypes
  isSwiping?: boolean
  slug: string
  layout?: 'contain' | 'fill'
  type: 'artwork' | 'artist' | 'post' | 'product'
  l?: 'fixed-contain' | 'fixed-fill' | 'intrinsic'
  photo: ImageMetaResult | null
  title?: string
  modal?: boolean
  alt?: string
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
    modal = false,
    alt,
  } = props

  const { pushAsModal, saveScroll } = useModalContext()
  const router = useRouter()

  const isCarousel = galleryType === 'carousel'
  const isGrid = galleryType === 'grid'
  const isMasonry = galleryType === 'masonry'

  return (
    <Link href={`/${type}/${slug}`} passHref>
      <a
        draggable={false}
        {...mouseLinkProps}
        className={classNames(
          `block mx-auto w-full max-w-sm  bg-frida-white`,
          { 'mb-10': isGrid || isMasonry },
          {
            'p-4 transform scale-75 lg:scale-100 ': isCarousel,
          }
        )}
        onClick={(e) => {
          e.preventDefault()

          if (modal) {
            !isSwiping && pushAsModal(`/${type}/${slug}`, type)
          } else {
            saveScroll(router.asPath)
            router.push(`/${type}/${slug}`)
          }
        }}
      >
        <FridaImage
          {...ARTWORK_IMAGE_PROPS}
          photo={photo}
          className={classNames(
            { 'aspect-w-9 aspect-h-12': isCarousel },
            { 'w-full': isMasonry },
            { 'aspect-w-9 aspect-h-12': isGrid }
          )}
          layout={isCarousel || isGrid ? layout : 'intrinsic'}
          alt={alt}
        />
        {title && (
          <div
            // className={` h-8  ${
            //   artistName && artistName.length > 18 ? 'text-xxs-fluid' : 'text-xl'
            // } font-bold mt-3`}

            className={` h-8 text-sm-fluid font-bold mt-4`}
          >
            <Frida text={title} textColor={'pink'}></Frida>
          </div>
        )}
        {children}
      </a>
    </Link>
  )
}

export default CardWrap
