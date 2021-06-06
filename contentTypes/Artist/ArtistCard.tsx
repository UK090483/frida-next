import Card from '@components/Card'
import { imageMeta } from '@lib/api'
import { ImageMetaResult } from '@lib/queries/snippets'
import React from 'react'
import { GalleryTypes } from 'types'

export const artistCardQuery = `
     
    'slug':slug.current,
    'name':anzeigeName,
     'photo':*[_type == 'artwork'  && references(^._id) ][0].image {${imageMeta}},
     'stil':*[_type == 'artwork' && references(^._id)].stil->name
`
export type ArtistCardResult = {
  name: string
  slug: string
  photo: ImageMetaResult
  stil: string[]
}

interface ArtistCardProps extends ArtistCardResult {
  isSwiping?: boolean
  type: GalleryTypes
}

const ArtistCard: React.FC<ArtistCardProps> = (props) => {
  const { name, photo, slug, isSwiping, type } = props
  if (!photo) return null

  return (
    <Card
      isSwiping={!!isSwiping}
      slug={slug}
      type="artist"
      galleryType={type}
      photo={photo}
      title={name}
      layout="fill"
      alt={`Artist ${name}`}
    />
  )
}

export default ArtistCard
