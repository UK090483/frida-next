import { imageMeta, ImageMetaResult } from 'pageBuilder/queries/snippets'

export const artworkCardQuery = `
    _updatedAt,
    isNft,
    ethPrice,
    'imageAssetId':image.asset._ref,
    availability,
    'artistName':artist->anzeigeName,
    'slug': slug.current,
    banner,
    'price': price,
    'artworkName':name,
    'photo': image {
      ${imageMeta}
    },
    'stil':stil->name,
    'medium':medium->name 
`
export type ArtworkCardResult = {
  _updatedAt: string
  imageAssetId: string
  availability: string
  isNft: boolean | null
  ethPrice: number | null
  artistName: string
  slug: string
  banner: string
  price: number
  artworkName: string
  photo: ImageMetaResult
  stil: string
  medium: string
}
