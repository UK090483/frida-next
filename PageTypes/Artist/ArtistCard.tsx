import Card from '@components/Card'
import { useRouter } from 'next/router'
import React from 'react'
import { GalleryTypes } from 'types'
import { ArtistCardResult } from './ArtistCard.query'

interface ArtistCardProps extends ArtistCardResult {
  isSwiping?: boolean
  type: GalleryTypes
}

const ArtistCard: React.FC<ArtistCardProps> = (props) => {
  const { name, photo, slug, isSwiping, type, prevImage, mainImage } = props

  const { locale } = useRouter()
  const _photo = prevImage || mainImage || photo

  const altText = locale === 'en' ? `Artist ${name}` : `Künstler ${name}`

  const ariaLabel =
    locale === 'en'
      ? `Read more aboute the Artist ${name}`
      : `Lies mehr über den Künstler ${name}`

  return (
    <Card
      testId="artist__card"
      isSwiping={!!isSwiping}
      slug={slug}
      type="artist"
      galleryType={type}
      photo={_photo}
      title={name}
      layout="fill"
      alt={altText}
      ariaLabel={ariaLabel}
    />
  )
}

export default ArtistCard
