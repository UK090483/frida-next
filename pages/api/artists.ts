import getHandler from 'pageBuilder/Api/resourceHandler'
import { getSanityClient } from '@lib/sanity.server'
import { artistCardQuery, ArtistCardResult } from 'PageTypes/Artist/ArtistCard'

const handler = getHandler<ArtistCardResult>({
  type: 'artist',
  query: artistCardQuery,
  sanity: getSanityClient(),
})
export default handler
