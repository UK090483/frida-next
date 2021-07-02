import sanityClient from '@sanity/client'
import { artworkCardQuery } from 'PageTypes/Artwork/ArtworkCard'

const sanity = sanityClient({
  dataset: process.env.SANITY_PROJECT_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2019-01-29',
  useCdn: false,
})
let artworks = null
export default async function send(req, res) {
  if (!artworks) {
    const allArtworks = await sanity.fetch(`*[_type == 'artwork']{
      ${artworkCardQuery}
    }`)

    artworks = shuffle(allArtworks)
  }

  res.statusCode = 200
  res.json(JSON.stringify(artworks, null, 3))
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
