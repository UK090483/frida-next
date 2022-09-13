import getHandler from 'pageBuilder/Api/resourceHandler'
import { getSanityClient } from '@lib/sanity.server'
import {
  ArtistCardResult,
  artistCardQuery,
} from 'PageTypes/Artist/ArtistCard.query'

const handler = getHandler<ArtistCardResult>({
  type: 'artist',
  query: artistCardQuery,
  sanity: getSanityClient(),
})
export default handler
