import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'
import { defaultFooterId } from 'shared'

export const layoutQuery = (locale = '') => `
'layout':{
  _type,
  
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
