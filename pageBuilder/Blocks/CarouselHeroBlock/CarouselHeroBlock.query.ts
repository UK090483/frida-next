import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'
import { FridaColors } from 'types'
import { richTextQuery } from '../RichText/RichText.query'

export const carouselHeroBlockQuery = (locale = '') => `
_type == "carouselHero" => {
  carouselHeroItems[]{
    ...,
     ${richTextQuery(locale)},
    'photo': image {
      ${imageMeta}
    }
   }
}
`
export interface CarouselHeroResult extends PageBuilderBlockBase {
  _type: 'carouselHero'
  carouselHeroItems: {
    bgColor: FridaColors
    photo: ImageMetaResult
    content: any
  }[]
}