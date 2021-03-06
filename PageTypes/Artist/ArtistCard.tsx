import Card from '@components/Card'
import { ImageMetaResult, imageMeta } from '@lib/queries/snippets'
import React from 'react'
import { FridaLocation, GalleryTypes } from 'types'

export const artistCardQuery = `
    'mainImage':mainImage {${imageMeta}},
    'prevImage':prevImage {${imageMeta}},
    'slug':slug.current,
    'name':anzeigeName,
     'photo':*[_type == 'artwork'  && references(^._id) ][0].image {${imageMeta}},
     'stil':*[_type == 'artwork' && references(^._id)].stil->name
`

export type ArtistCardResult = {
  prevImage: ImageMetaResult | null
  mainImage: ImageMetaResult | null
  name: string
  slug: string
  photo: ImageMetaResult | null
  stil: string[]
}

interface ArtistCardProps extends ArtistCardResult {
  isSwiping?: boolean
  type: GalleryTypes
  lang: FridaLocation
}

const ArtistCard: React.FC<ArtistCardProps> = (props) => {
  const { name, photo, slug, isSwiping, type, prevImage, mainImage, lang } =
    props

  const _photo = prevImage || mainImage || photo

  const altText = lang === 'en' ? `Artist ${name}` : `Künstler ${name}`

  const ariaLabel =
    lang === 'en'
      ? `Read more aboute the Artist ${name}`
      : `Lies mehr über den Künstler ${name}`

  return (
    <Card
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
