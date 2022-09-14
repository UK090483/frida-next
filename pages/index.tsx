import {
  handleStaticProps,
  handleStaticPropsResult,
} from '@lib/queries/handleStaticProps'
import Page from 'PageTypes/Page/Page'
import { PageResult } from 'PageTypes/Page/Page.query'
import { GetStaticProps } from 'next'
import React from 'react'

import { pageQuery } from '../PageTypes/Page/Page.query'
import PageType from 'pageBuilder/PageType'

const query = (
  locale = ''
) => `*[_type == 'indexPage'  && _id == 'frontPage'][0]{
  ${pageQuery(locale)},
}
`
const Home: React.FC<handleStaticPropsResult<PageResult>> = (props) => {
  return <PageType {...props}>{(data) => <Page data={data} />}</PageType>
}

export const getStaticProps: GetStaticProps = async (props) => {
  return await handleStaticProps({
    ...props,
    params: { slug: '/' },
    query,
  })
}

export default Home
