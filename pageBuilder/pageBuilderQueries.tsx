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
  categoriesBlockQuery,
  CategoryBlockResult,
} from 'pageBuilder/Blocks/CategoryBlock'
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
  QuotesBlockQuery,
  QuotesBlockResult,
} from 'pageBuilder/Blocks/QuotesBlock'
import { richTextQuery, RichTextQueryResult } from 'pageBuilder/Blocks/RichText'
import {
  sectionBlockQuery,
  SectionResult,
} from 'pageBuilder/Blocks/SectionBlock'
import { ButtonPlugResult } from 'pageBuilder/Plugs/ButtonPlug'
import { EmbedPlugResult } from 'pageBuilder/Plugs/EmbedPlug'
import { ImageGalleryPlugResult } from 'pageBuilder/Plugs/ImageGaleriePlug'
import { ImagePlugResult } from 'pageBuilder/Plugs/ImagePlug'
import { SeoHeaderPlugResult } from 'pageBuilder/Plugs/SeoHeader'
import { DownloadPlugResult } from './Plugs/DownLoadPlug'
import { InnerSectionPlugResult } from './Plugs/innerSection'
import { SpacerPlugResult } from './Plugs/Spacer'

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
  ${QuotesBlockQuery},
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
