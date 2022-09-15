import { getAllDocPathsCached } from '@lib/queries/fetchDocPathApi'
import {
  handleStaticProps,
  handleStaticPropsResult,
} from '@lib/queries/handleStaticProps'
import type { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

import Page from 'PageTypes/Page/Page'

import PageType from 'pageBuilder/PageType'
import { pageQuery, PageResult } from 'PageTypes/Page/Page.query'

const query = (
  locale: string
) => `*[_type == "page" && slug.current == $slug][0]{
  ${pageQuery(locale)},  
}`

const CustomPage: React.FC<handleStaticPropsResult<PageResult>> = (props) => {
  return <PageType {...props}>{(data) => <Page data={data} />}</PageType>
}

export const getStaticProps: GetStaticProps = async (props) => {
  return await handleStaticProps({ ...props, query })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('page')
}

export default CustomPage
