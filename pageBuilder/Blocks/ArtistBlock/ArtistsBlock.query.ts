import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'
import {
  artistCardQuery,
  ArtistCardResult,
} from 'PageTypes/Artist/ArtistCard.query'
import { FridaColors } from 'types'

export const artistsBlockQuery = (locale = '') => `
_type == "artists" => {
  ...,
  type,
  'label': coalesce(label_${locale},label),
  bgColor,
  'items': *[_type == 'artist' && slug != null][0...8]{
    ${artistCardQuery}
  }
}
`
export interface ArtistsGalleryResult extends PageBuilderBlockBase {
  _type: 'artists'
  type: 'carousel' | 'masonry'
  label?: null | string
  items: ArtistCardResult[]
  bgColor: FridaColors
}
