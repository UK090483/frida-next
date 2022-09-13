import { ButtonPlugResult } from 'pageBuilder/Plugs/ButtonPlug'
import { EmbedPlugResult } from 'pageBuilder/Plugs/EmbedPlug'
import { ImageGalleryPlugResult } from 'pageBuilder/Plugs/ImageGaleriePlug'
import { ImagePlugResult } from 'pageBuilder/Plugs/ImagePlug'
import { SeoHeaderPlugResult } from 'pageBuilder/Plugs/SeoHeader'
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
import { DownloadPlugResult } from './Plugs/DownLoadPlug'
import { InnerSectionPlugResult } from './Plugs/innerSection'
import { SpacerPlugResult } from './Plugs/Spacer'

export type PageBuilderBlockBase = {
  _type: string
  _key: string
}

export const body = (locale = '') => `
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
  | SpacerPlugResult
  | DownloadPlugResult
)[]
