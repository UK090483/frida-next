import { SiteResult } from '@lib/queries/cache'
import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'
import { FridaColors } from 'types'

export const pageQuery = `
...,
'slug':slug.current,
footer->{${body}},
${body}
'site':'getSite'
`

export type PageResult = {
  content: PageBodyResult
  title?: string
  title_en?: string
  slug: null | string
  footer?: any
  pageHeader?: null | {
    initialPageTitleColor: FridaColors
    hideMenu?: null | boolean
    withOutHomeLink?: null | boolean
  }
  site: SiteResult
}
