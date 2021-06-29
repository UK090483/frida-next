// import { getSanityClient } from '@lib/sanity.server'
// import { FridaColors } from 'types'
// import { SiteResult } from './cache'
// import { PageBodyResult, body } from '../../pageBuilder/pageBuilderQueries'

// const navigation = `
// 'navigation':*[_type == "navigation"][0]{
//   'items': item[]{
//     label,
//     label_en,
//     link,
//     'internalLink':internalLink->slug.current
//   }
// }
// `
// export type NavigationResult = {
//   items: {
//     label: string
//     label_en: string | null
//     link: string | null
//     internalLink: string | null
//   }[]
// }

// const footer = `

// 'footer': select(defined(@.footer)=>@.footer->{${body}},!defined(@.footer)=>*[_type=='footer' && _id=='3667a872-9775-477c-b33b-09370c28524f'][0]{${body}}  )

// `
// export type FooterResult = {
//   content: PageBodyResult
// }[]
// const seo = `
// "seo": *[_type == "seoSettings"][0]{
//   siteTitle,
//   metaTitle,
//   metaDesc,
//   shareTitle,
//   shareDesc,
//   shareGraphic
// }
// `

// export type SeoResult = {
//   siteTitle: string | null
//   metaTitle: string | null
//   metaDesc: string | null
//   shareTitle: string | null
//   shareDesc: string | null
//   shareGraphic: any | null
// }
// export const site = `
// 'site':{
//   ${navigation},
//   ${seo},
//   ${footer}
// }
// `

// export const site = `
// 'site':'getSite'
// `
// export type SiteResult = {
//   seo: SeoResult
//   navigation: NavigationResult
//   footer: FooterResult
// }
export {}
