import { SiteResult } from '@lib/queries/cache'
import { LayoutResult, layoutQuery } from 'pageBuilder/Layout/layoutQuery'
import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'
import { buildSeoQuery } from 'pageBuilder/Seo/seoQuery'
import { FridaColors } from 'types'

export const pageQuery = (locale = '') => `
type_,
'slug':slug.current,
title,
title_en,
${body(locale)}
${layoutQuery(locale)},
${buildSeoQuery()}
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
