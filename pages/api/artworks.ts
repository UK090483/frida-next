import getHandler from 'pageBuilder/Api/resourceHandler'
import { getSanityClient } from '@lib/sanity.server'
import {
  artworkCardQuery,
  ArtworkCardResult,
} from 'PageTypes/Artwork/ArtworkCard'

const handler = getHandler<ArtworkCardResult>({
  type: 'artwork',
  query: artworkCardQuery,
  sanity: getSanityClient(),
})
export default handler
