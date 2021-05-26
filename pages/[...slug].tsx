import { usePage } from '@lib/queries/usePage'
import { getAllDocPathsCached } from '@lib/queries/fetchDocPathApi'
import { handleStaticProps } from '@lib/queries/handleStaticProps'
import { page as pageQuery, PageResult } from '@lib/queries/pageQueries'
import Error from '@pages/404'
import PageBuilder from 'contentTypes/Page/Page'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { FridaLocation } from 'types'

type PageProps = {
  data: PageResult | null
  lang: FridaLocation
  slug: string
}

const query = `*[_type == "page" && slug.current == $slug][0]{
  ${pageQuery}
}`

const Page: React.FC<PageProps> = ({ data, lang, slug }) => {
  const { pageData, isError } = usePage({ slug, query, data })

  if (isError) return <Error />

  return <PageBuilder lang={lang} data={pageData} />
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  return await handleStaticProps({ params, locale, query })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('page')
}

export default Page
