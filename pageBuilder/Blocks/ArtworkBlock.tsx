import { PageBuilderBlockBase } from '../pageBuilderQueries'
import Carousel from '@components/CardCarousel'
import ArtworkCard, {
  artworkCardQuery,
  ArtworkCardResult,
} from 'PageTypes/Artwork/ArtworkCard'
import Artworks from 'PageTypes/Artwork/ArtworkGallery'
import React from 'react'
import { FridaLocation } from 'types'

export const artworksBlockQuery = `
_type == "artworks" => {
  type,
  label,
  label_en,
  'items':  *[_type == 'artwork'][0..5]{${artworkCardQuery}},
  'stil':*[_type=='stil']{name},
  'medium':*[_type=='medium']{name}
}
`

export interface ArtworksGalleryResult extends PageBuilderBlockBase {
  _type: 'artworks'
  type: 'carousel' | 'masonry'
  label?: null | string
  label_en?: null | string
  items: ArtworkCardResult[]
  stil?: { name: string }[]
  medium?: { name: string }[]
  count?: 'all' | number
}

interface ArtworksBlockProps extends ArtworksGalleryResult {
  lang: FridaLocation
}

const ArtworksBlock: React.FC<ArtworksBlockProps> = (props) => {
  const { items = [], lang, type, label, label_en } = props

  const _label = lang === 'en' && label_en ? label_en : label

  if (type === 'masonry') {
    return <Artworks {...props} lang={lang} />
  }

  return (
    <Carousel
      header={_label}
      items={items.map((item) => (
        <ArtworkCard key={item.slug} type="carousel" {...item} />
      ))}
    />
  )
}

export default ArtworksBlock
