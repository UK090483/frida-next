import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'
import {
  artistCardQuery,
  ArtistCardResult,
} from 'PageTypes/Artist/ArtistCard.query'
import { FridaColors } from 'types'

export const artistsBlockQuery = (locale: string) => `
_type == "artists" => {
  ...,
  type,
  'label': coalesce(label_${locale},label),
  bgColor,
  'items': select(

          type == 'carousel' => *[_type == 'artist' && slug != null][0...20],
          *[_type == 'artist' && slug != null][],

          )[]{${artistCardQuery}}
}
`
export interface ArtistsGalleryResult extends PageBuilderBlockBase {
  _type: 'artists'
  type: 'carousel' | 'masonry'
  label?: null | string
  items: ArtistCardResult[]
  bgColor: FridaColors
}
