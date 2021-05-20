import Frida from '@components/Frida'
import FridaImage, {
  ARTWORK_IMAGE_PROPS,
} from '@components/fridaImage/FridaImage'
import { imageMeta } from '@lib/api'
import { ImageMetaResult } from '@lib/queries/snippets'
// import { ArtistCardResult } from '@lib/queries/snippets'
import CardWrap from 'components/CardCarousel/CardWrap'
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
  type: GalleryTypes
  isSwiping?: boolean
}

const ArtistCard: React.FC<ArtistCardProps> = (props) => {
  const { name, photo, slug, isSwiping, type } = props
  if (!photo) return null

  return (
    <CardWrap
      isSwiping={isSwiping}
      slug={slug}
      type="artist"
      galleryType={type}
    >
      <FridaImage
        photo={photo}
        {...ARTWORK_IMAGE_PROPS}
        layout={type === 'carousel' ? 'fill' : 'intrinsic'}
        className={type === 'carousel' ? 'aspect-w-9 aspect-h-12' : `w-full `}
      />

      <div className="text-lg font-bold mt-3">
        <Frida text={name} textColor="pink" />
      </div>
    </CardWrap>
  )
}

export default ArtistCard
