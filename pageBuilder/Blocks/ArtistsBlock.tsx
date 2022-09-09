import React from 'react'

import ArtistGallery from 'PageTypes/Artist/ArtistGallery'
import { FridaColors, FridaLocation } from 'types'
import Carousel from '@components/CardCarousel'
import ArtistCard, {
  artistCardQuery,
  ArtistCardResult,
} from 'PageTypes/Artist/ArtistCard'
import { PageBuilderBlockBase } from '../pageBuilderQueries'
import { useArtists } from 'pageBuilder/Api/useResource'

export const artistsBlockQuery = `
_type == "artists" => {
  type,
  label,
  bgColor,
  label_en,
  'items': *[_type == 'artist' && slug != null][0...8]{
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
  bgColor: FridaColors
}

interface ArtistsBlockProps extends ArtistsGalleryResult {
  lang: FridaLocation
}

const ArtworksBlock: React.FC<ArtistsBlockProps> = (props) => {
  const { items = [], lang, type, label, label_en, bgColor = 'white' } = props

  const [fetchArtists] = useArtists()

  const _items = fetchArtists.length > 0 ? fetchArtists : items

  const _label = lang === 'en' && label_en ? label_en : label

  if (type === 'masonry') {
    return <ArtistGallery items={items} lang={lang} />
  }

  return (
    <Carousel
      bgColor={bgColor}
      header={_label}
      items={_items.map((item) => (
        <ArtistCard key={item.slug} type={type} {...item} />
      ))}
    />
  )
}

export default ArtworksBlock
