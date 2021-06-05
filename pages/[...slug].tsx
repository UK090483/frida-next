import { usePage } from '@lib/queries/usePage'
import { getAllDocPathsCached } from '@lib/queries/fetchDocPathApi'
import { handleStaticProps } from '@lib/queries/handleStaticProps'

import Error from '@pages/404'
import PageBuilder from 'contentTypes/Page/Page'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { FridaColors, FridaLocation } from 'types'
import { SiteResult } from '@lib/queries/cache'
import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'

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

type PageProps = {
  data: PageResult | null
  lang: FridaLocation
  slug: string
  preview: boolean | undefined
}

const query = `*[_type == "page" && slug.current == $slug][0]{
  ${pageQuery}
}`

const Page: React.FC<PageProps> = (props) => {
  const { data, lang, slug, preview } = props
  const { pageData, isError } = usePage({ slug, query, data, preview })
  if (isError) return <Error />
  if (!pageData) return <div>Page</div>
  return <PageBuilder lang={lang} data={pageData} preview={preview} />
}

export const getStaticProps: GetStaticProps = async (props) => {
  return await handleStaticProps({ ...props, query })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('page')
}

export default Page
