import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'
import {
  artworkCardQuery,
  ArtworkCardResult,
} from 'PageTypes/Artwork/ArtworkCard.query'

export const artworksBlockQuery = (locale = '') => `
_type == "artworks" => {
  ...,
  type,
  'label': coalesce(label_${locale},label),
  
  'items':  select(
              'lastEdited' in order => *[_type == 'artwork'] | order(_updatedAt desc)[0...20],
              count == 'all' => *[_type == 'artwork'][],
              *[_type == 'artwork'][0...20]
            )[]{${artworkCardQuery}},
  'stil':*[_type=='stil']{name},
  'medium':*[_type=='medium']{name}
}
`

export interface ArtworksGalleryResult extends PageBuilderBlockBase {
  _type: 'artworks'
  type: 'carousel' | 'masonry'
  label?: null | string
  items: ArtworkCardResult[]
  stil?: { name: string }[]
  medium?: { name: string }[]
  count?: 'all' | number
  order?: string[]
}
