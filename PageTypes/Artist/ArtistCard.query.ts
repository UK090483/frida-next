import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'

export const artistCardQuery = `
    'mainImage':mainImage {${imageMeta}},
    'prevImage':prevImage {${imageMeta}},
    'slug':slug.current,
    'name':anzeigeName,
     'photo':*[_type == 'artwork'  && references(^._id) ][0].image {${imageMeta}},
     'stil':*[_type == 'artwork' && references(^._id)].stil->name
`

export type ArtistCardResult = {
  prevImage: ImageMetaResult | null
  mainImage: ImageMetaResult | null
  name: string
  slug: string
  photo: ImageMetaResult | null
  stil: string[]
}
