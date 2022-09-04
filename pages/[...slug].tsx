import { getAllDocPathsCached } from '@lib/queries/fetchDocPathApi'
import { handleStaticProps } from '@lib/queries/handleStaticProps'
import { usePage } from '@lib/queries/usePage'
import PageBuilder from 'PageTypes/Page/Page'
import { PageResult } from 'PageTypes/Page/pageQueries'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Error from 'pages/404'
import React from 'react'
import type { FridaLocation } from 'types'
import { pageQuery } from 'PageTypes/Page/pageQueries'

export type PageProps = {
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
