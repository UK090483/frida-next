import sanityClient, { SanityClient } from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'
const { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID, SANITY_API_TOKEN } =
  process.env

let sanity: undefined | SanityClient
if (SANITY_PROJECT_DATASET && SANITY_PROJECT_ID && SANITY_API_TOKEN) {
  sanity = sanityClient({
    dataset: SANITY_PROJECT_DATASET,
    projectId: SANITY_PROJECT_ID,
    apiVersion: '2019-01-29',
    useCdn: true,
  })
}
interface ISearchResultItem {
  _id: string
  slug: string
  _type: string
  name: string
}

export interface ISearchResult {
  artworks: ISearchResultItem[]
  artists: ISearchResultItem[]
  all: ISearchResultItem[]
}

interface IFetchResult {
  artworks: ISearchResultItem[]
  artists: ISearchResultItem[]
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!sanity) {
    console.error('unable to establish sanity Client')
    return res
      .status(200)
      .json({ message: 'unable to establish sanity Client' })
  }

  const queryString = req?.query?.q
  const type = req?.query?.type

  const artworkQuery = `'artworks' :*[_type == 'artwork' && name match '${queryString}*' ][0...4]{
    _id,
    _type,
    name,
    'slug':slug.current
  },`
  const artistQuery = `'artists' :*[_type == 'artist' && anzeigeName match '${queryString}*' ][0...4]{
    _id,
    _type,
    'name': anzeigeName,
    'slug':slug.current
  },`

  const fetchRes = await sanity.fetch<IFetchResult>(
    `{
        ${artworkQuery}
        ${artistQuery}
    }`
  )

  const data = {
    ...fetchRes,
    all: [...fetchRes.artists, ...fetchRes.artworks],
  }

  return res.status(200).json({ queryString, type, data })
}

export default handler
