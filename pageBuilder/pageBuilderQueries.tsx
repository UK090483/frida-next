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
  MarqueeBlockQuery,
  MarqueeBlockQueryResult,
} from 'pageBuilder/Blocks/Marquee'
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

import {
  categoriesBlockQuery,
  CategoryBlockResult,
} from 'pageBuilder/Blocks/CategoryBlock'
import {
  QuotesBlockQuery,
  QuotesBlockResult,
} from 'pageBuilder/Blocks/QuotesBlock'

import { richTextQuery, RichTextQueryResult } from 'pageBuilder/Blocks/RichText'

import { EmbedPlugResult } from 'pageBuilder/Plugs/EmbedPlug'
import { ButtonPlugResult } from 'pageBuilder/Plugs/ButtonPlug'
import { ImagePlugResult } from 'pageBuilder/Plugs/ImagePlug'
import { SeoHeaderPlugResult } from 'pageBuilder/Plugs/SeoHeader'
import { ImageGalleryPlugResult } from 'pageBuilder/Plugs/ImageGaleriePlug'
import { InnerSectionPlugResult } from './Plugs/innerSection'

export type PageBuilderBlockBase = {
  _type: string
  _key: string
}

export const body = `
content[]{
  ...,
  ${carouselHeroBlockQuery},
  ${categoriesBlockQuery},
  ${artworksBlockQuery},
  ${artistsBlockQuery},
  ${productsBlockQuery},
  ${postsBlockQuery},
  ${sectionBlockQuery},
  ${richTextQuery},
  ${MarqueeBlockQuery},
  ${QuotesBlockQuery}
},
`

export type PageBodyResult = (
  | CarouselHeroResult
  | ArtworksGalleryResult
  | ArtistsGalleryResult
  | PostsGalleryResult
  | ProductsGalleryResult
  | SectionResult
  | RichTextQueryResult
  | MarqueeBlockQueryResult
  | EmbedPlugResult
  | CategoryBlockResult
  | ButtonPlugResult
  | ImagePlugResult
  | SeoHeaderPlugResult
  | QuotesBlockResult
  | ImageGalleryPlugResult
  | InnerSectionPlugResult
)[]
