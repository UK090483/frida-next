import { siteQuery, SiteResult } from '@lib/queries/cache'
import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'
import { FridaColors } from 'types'

export const pageQuery = `
...,
type_,
'slug':slug.current,
footer->{${body}},
${body}
${siteQuery}
`
export type PageResult = {
  type_: 'page' | 'indexPage'
  content: PageBodyResult
  title?: string
  title_en?: string
  slug: null | string
  footer?: PageBodyResult
  pageHeader?: null | {
    initialPageTitleColor: FridaColors
    hideMenu?: null | boolean
    withOutHomeLink?: null | boolean
  }
  site: SiteResult
}
