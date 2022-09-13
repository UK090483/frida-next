import { imageMeta } from '@lib/queries/snippets'
import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'
import { FridaColors } from 'types'

export const MarqueeBlockQuery = `
_type == 'marquee' => {
    _type,
    _key,
    items[]{
      _type == 'simple' => {
        _type,
        text,
        text_en,
        
      },
      _type == 'photo' => {
        _type,
        "photo": {
          ${imageMeta}
        }
      },
    },
    speed,
    reverse,
    pauseable,
    bgColor,
    bgColorHover,
    color,
    colorHover,
  }
`
type TextItem = {
  _type: 'simple'
  text: string
  text_en?: string
}

type imageItem = {
  _type: 'photo'
  photo: any
}

export interface MarqueeBlockQueryResult extends PageBuilderBlockBase {
  _type: 'marquee'
  items?: (TextItem | imageItem)[]
  speed?: number
  reverse?: null | boolean
  pauseable?: null | boolean
  bgColor?: FridaColors
  bgColorHover?: FridaColors
  color?: FridaColors
  colorHover?: FridaColors
}
