import React from 'react'

import ArtistGallery from 'contentTypes/Artist/ArtistGallery'
import { FridaLocation } from 'types'
// import { ArtistsGalleryResult } from '@lib/queries/pageBuilderQueries'
import Carousel from '@components/Carousel'
import ArtistCard, {
  artistCardQuery,
  ArtistCardResult,
} from 'contentTypes/Artist/ArtistCard'
import { PageBuilderBlockBase } from '../pageBuilderQueries'

export const artistsBlockQuery = `
_type == "artists" => {
  type,
  label,
  label_en,
  'items': *[_type == 'artist' && slug != null][0...4]{
    ${artistCardQuery}
  }
}
`

export interface ArtistsGalleryResult extends PageBuilderBlockBase {
  _type: 'artists'
  type: 'carousel' | 'masonry'
  label?: null | string
  label_en?: null | string
  items: ArtistCardResult[]
}

interface ArtistsBlockProps extends ArtistsGalleryResult {
  lang: FridaLocation
}

const ArtworksBlock: React.FC<ArtistsBlockProps> = (props) => {
  const { items = [], lang, type, label, label_en } = props

  const _label = lang === 'en' && label_en ? label_en : label

  if (type === 'masonry') {
    return <ArtistGallery items={items} lang={lang} />
  }

  return (
    <Carousel
      header={_label}
      items={items.map((item) => (
        <ArtistCard type={type} {...item} />
      ))}
    />
  )
}

export default ArtworksBlock
