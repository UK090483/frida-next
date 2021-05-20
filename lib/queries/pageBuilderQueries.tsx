import {
  artistsBlockQuery,
  ArtistsGalleryResult,
} from 'pageBuilder/Blocks/ArtistsBlock'
import {
  artworksBlockQuery,
  ArtworksGalleryResult,
} from 'pageBuilder/Blocks/ArtworkBlock'
import {
  carouselHeroBlockQuery,
  CarouselHeroResult,
} from 'pageBuilder/Blocks/CarouselHeroBlock'
import {
  postsBlockQuery,
  PostsGalleryResult,
} from 'pageBuilder/Blocks/PostsBlock'
import {
  productsBlockQuery,
  ProductsGalleryResult,
} from 'pageBuilder/Blocks/ProductsBlock'
import {
  sectionBlockQuery,
  SectionResult,
} from 'pageBuilder/Blocks/SectionBlock'
import { richTextQuery } from 'pageBuilder/RichText'

export type PageBuilderBlockBase = {
  _type: string
  _key: string
}

export const body = `
content[]{
  ...,
  ${carouselHeroBlockQuery},
  ${artworksBlockQuery},
  ${artistsBlockQuery},
  ${productsBlockQuery},
  ${postsBlockQuery},
  ${sectionBlockQuery},
  ${richTextQuery},
},
`

export type PageBodyResult = (
  | CarouselHeroResult
  | ArtworksGalleryResult
  | ArtistsGalleryResult
  | PostsGalleryResult
  | ProductsGalleryResult
  | SectionResult
)[]
