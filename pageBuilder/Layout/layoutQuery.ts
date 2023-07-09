import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'
import { defaultFooterId } from 'shared'
import { FridaColors } from 'types'

export const layoutQuery = (locale: string) => `
'layout':{
  _type,
  _id,
  'title': select(
    _type == 'artwork' => artist->anzeigeName,
    _type == 'artist' => anzeigeName,
    _type == 'page'=> coalesce(title_${locale},title),
    _type == 'post'=> coalesce(categories[0]->title_${locale},categories[0]->title),
    'Frida'
  ),

  pageHeader,


  'footer':*[_type=='footer' && _id == '${defaultFooterId}' ][0]{${body(
  locale
)}},
  'navigation':*[_type == "navigation"][0]{
    'items': item[]{
      label,
      label_en,
      link,
      'internalLink':internalLink->slug.current
      },
      'footerItems': footerNav[]{
        label,
        label_en,
        link,
        'internalLink':internalLink->{'type':_type, 'slug':slug.current},
      },
    },
  }
`
export type LayoutResult = {
  title?: string
  _id: string
  pageHeader?: {
    initialPageTitleColor?: FridaColors
  }
  footer: {
    content: PageBodyResult
  }
  navigation: null | {
    items: {
      label: string
      label_en: string | null
      link: string | null
      internalLink: string | null
    }[]

    footerItems?: {
      label?: string
      label_en?: string | null
      link?: string | null
      internalLink?: { type: string; slug: string }
    }[]
  }
}
