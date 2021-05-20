import { PageBuilderBlockBase } from '@lib/queries/pageBuilderQueries'
import Carousel from 'components/CardCarousel/Carousel'
import ArtworkCard, {
  artworkCardQuery,
  ArtworkCardResult,
} from 'contentTypes/Artwork/ArtworkCard'
import Artworks from 'contentTypes/Artwork/ArtworkGallery'
import React from 'react'
import { FridaLocation } from 'types'

const hasNoFilter = `(count(filter) == 0 || coalesce(filter,true))`
const hasFilter = `(count(filter) > 0)`

export const artworksBlockQuery = `
_type == "artworks" => {
  type,
  'items':  select(
    ${hasNoFilter} && count=='20' => *[_type == 'artwork'][0...10]{${artworkCardQuery}},
    ${hasNoFilter} && count=='all' => *[_type == 'artwork']{${artworkCardQuery}},
    ${hasFilter}  && count=='20' => *[_type == 'artwork'  && references(^.filter[]._ref)][0...10]{${artworkCardQuery}},
    ${hasFilter} && count=='all' => *[_type == 'artwork'  && references(^.filter[]._ref)]{${artworkCardQuery}}
    ),
  'stil':*[_type=='stil']{name},
  'medium':*[_type=='medium']{name}
}
`

// export const artworksBlockQuery = `
// _type == "artworks" => {
//   type,

//   'stil':*[_type=='stil']{name},
//   'medium':*[_type=='medium']{name}
// }
// `
export interface ArtworksGalleryResult extends PageBuilderBlockBase {
  type: 'carousel' | 'masonry'
  items: ArtworkCardResult[]
  stil?: { name: string }[]
  medium?: { name: string }[]
}

interface ArtworksBlockProps extends ArtworksGalleryResult {
  lang: FridaLocation
}

const ArtworksBlock: React.FC<ArtworksBlockProps> = (props) => {
  const { items = [], lang, type } = props

  if (type === 'masonry') {
    return <Artworks {...props} lang={lang} />
  }

  return (
    <Carousel
      items={items.map((item) => (
        <ArtworkCard key={item.slug} type="carousel" {...item} />
      ))}
    />
  )
}

export default ArtworksBlock
