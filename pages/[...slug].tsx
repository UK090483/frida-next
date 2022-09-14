import type { GetStaticPaths, GetStaticProps } from 'next'
import { getAllDocPathsCached } from '@lib/queries/fetchDocPathApi'
import {
  handleStaticProps,
  handleStaticPropsResult,
} from '@lib/queries/handleStaticProps'
import { usePage } from '@lib/queries/usePage'
import Page from 'PageTypes/Page/Page'
import { PageResult } from 'PageTypes/Page/Page.query'
import Error from 'pages/404'
import React from 'react'
import { pageQuery } from 'PageTypes/Page/Page.query'
import PageType from 'pageBuilder/PageType'

const query = (
  locale: string
) => `*[_type == "page" && slug.current == $slug][0]{
  ${pageQuery(locale)},  
}`

const CustomPage: React.FC<handleStaticPropsResult<PageResult>> = (props) => {
  // const { data, slug, previewQuery } = props
  // const { pageData, isError } = usePage({
  //   slug,
  //   query: previewQuery,
  //   data,
  // })

  // if (isError) return <Error />
  // if (!pageData) return <div>Page</div>
  // return <Page data={pageData} />

  return <PageType {...props}>{(data) => <Page data={data} />}</PageType>
}

export const getStaticProps: GetStaticProps = async (props) => {
  return await handleStaticProps({ ...props, query })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('page')
}

export default CustomPage
