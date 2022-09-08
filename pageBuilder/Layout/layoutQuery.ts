import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'
import { defaultFooterId } from 'shared'

export const layoutQuery = () => `
'layout':{
  'footer':*[_type=='footer' && _id == '${defaultFooterId}' ][0]{${body}},
  "seo": *[_type == "seoSettings"][0]{
    siteTitle,
    metaTitle,
    metaDesc,
    shareTitle,
    shareDesc,
    shareGraphic
  },
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
  seo: {
    siteTitle: string | null
    metaTitle: string | null
    metaDesc: string | null
    shareTitle: string | null
    shareDesc: string | null
    shareGraphic: any | null
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
