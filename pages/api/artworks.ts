import getHandler from 'pageBuilder/Api/resourceHandler'
import { getSanityClient } from '@lib/sanity.server'
import {
  ArtworkCardResult,
  artworkCardQuery,
} from 'PageTypes/Artwork/ArtworkCard.query'

const handler = getHandler<ArtworkCardResult>({
  type: 'artwork',
  query: artworkCardQuery,
  sanity: getSanityClient(),
})
export default handler
