import { getSanityClient } from '@lib/sanity'
import {
  artworkCardQuery,
  ArtworkCardResult,
} from 'contentTypes/Artwork/ArtworkCard'
import { SiteResult, site } from './pageQueries'

const artistSingleView = `
'slug':slug.current,
'name':anzeigeName,
description,
description_en,
webLink,
instagramLink,
'relatedArtworks':*[_type == 'artwork' && references(^._id)]{
    ${artworkCardQuery}
},
${site}
`

export type ArtistPageResult = {
  slug: string
  name: string | null
  description: string | null
  description_en: string | null
  webLink: string | null
  instagramLink: string | null
  relatedArtworks: ArtworkCardResult[]
  site: SiteResult
}

export const getArtistPage = async (slug: string, preview: any) => {
  const slugs = [`/${slug}`, slug, `/${slug}/`]

  const query = `
        *[_type == "artist" && slug.current in ${JSON.stringify(slugs)}][0]{
          ${artistSingleView},
        }
      `

  const data = await getSanityClient(preview).fetch(query)

  return data as ArtistPageResult | null
}
