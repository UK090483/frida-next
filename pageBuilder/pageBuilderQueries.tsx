import { ImageGalleryPlugResult } from 'pageBuilder/Blocks/RichText/Plugs/ImageGalleryPlug'
import { ImagePlugResult } from 'pageBuilder/Blocks/RichText/Plugs/ImagePlug'
import { SeoHeaderPlugResult } from 'pageBuilder/Blocks/RichText/Plugs/SeoHeader'
import {
  artistsBlockQuery,
  ArtistsGalleryResult,
} from './Blocks/ArtistBlock/ArtistsBlock.query'
import {
  artworksBlockQuery,
  ArtworksGalleryResult,
} from './Blocks/ArtworkBlock/ArtworkBlock.query'
import {
  carouselHeroBlockQuery,
  CarouselHeroResult,
} from './Blocks/CarouselHeroBlock/CarouselHeroBlock.query'
import {
  categoriesBlockQuery,
  CategoryBlockResult,
} from './Blocks/CategoryBlock/CategoryBlock.query'
import {
  MarqueeBlockQuery,
  MarqueeBlockQueryResult,
} from './Blocks/Marquee/Marquee.query'
import {
  postsBlockQuery,
  PostsGalleryResult,
} from './Blocks/PostsBlock/PostsBlock.query'
import {
  productsBlockQuery,
  ProductsGalleryResult,
} from './Blocks/ProductsBlock/ProductsBlock.query'
import {
  QuotesBlockQuery,
  QuotesBlockResult,
} from './Blocks/QuotesBlock/QuotesBlock.query'
import {
  richTextQuery,
  RichTextQueryResult,
} from './Blocks/RichText/RichText.query'
import {
  sectionBlockQuery,
  SectionResult,
} from './Blocks/SectionBlock/SectionBlock.query'
import { ButtonPlugResult } from './Blocks/RichText/Plugs/ButtonPlug/ButtonPlug.query'
import { DownloadPlugResult } from './Blocks/RichText/Plugs/DownLoadPlug/DownLoadPlug.query'
import { EmbedPlugResult } from './Blocks/RichText/Plugs/EmbedPlug/EmbedPlug.query'

import { SpacerPlugResult } from './Blocks/RichText/Plugs/Spacer'
import {
  exhibitionsBlockQuery,
  ExhibitionsBlockResult,
} from './Blocks/ExhibitionsBlock/ExhibitionsBlock.query'
import { SearchBlockResult } from './Blocks/Search/SerachBlock.query'

export type PageBuilderBlockBase = {
  _type: string
  _key: string
}

export const body = (locale: string) => `
content[]{
  ...,
  ${carouselHeroBlockQuery(locale)},
  ${categoriesBlockQuery(locale)},
  ${artworksBlockQuery(locale)},
  ${artistsBlockQuery(locale)},
  ${productsBlockQuery},
  ${postsBlockQuery(locale)},
  ${sectionBlockQuery(locale)},
  ${richTextQuery(locale)},
  ${MarqueeBlockQuery},
  ${QuotesBlockQuery(locale)},
  ${exhibitionsBlockQuery(locale)},
},
`

export type PageBodyResult = (
  | ExhibitionsBlockResult
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
  | SpacerPlugResult
  | DownloadPlugResult
  | SearchBlockResult
)[]
