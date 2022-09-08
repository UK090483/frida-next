import { SiteResult } from '@lib/queries/cache'
import { LayoutResult, layoutQuery } from 'pageBuilder/Layout/layoutQuery'
import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'
import { FridaColors } from 'types'

export const pageQuery = `
...,
type_,
'slug':slug.current,
${body}
${layoutQuery()}
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
  layout: LayoutResult
}
