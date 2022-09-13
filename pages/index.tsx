import {
  handleStaticProps,
  handleStaticPropsResult,
} from '@lib/queries/handleStaticProps'
import { usePage } from '@lib/queries/usePage'
import Error from '@pages/404'
import Page from 'PageTypes/Page/Page'
import { PageResult } from 'PageTypes/Page/Page.query'
import { GetStaticProps } from 'next'
import React from 'react'

import { pageQuery } from '../PageTypes/Page/Page.query'

const query = (
  locale = ''
) => `*[_type == 'indexPage'  && _id == 'frontPage'][0]{
  ${pageQuery(locale)},
}
`
const Home: React.FC<handleStaticPropsResult<PageResult>> = (props) => {
  const { data, previewQuery } = props

  const { pageData, isError } = usePage({
    slug: '/',
    query: previewQuery,
    data,
  })

  if (isError) return <Error />
  return <Page data={pageData} />
}

export const getStaticProps: GetStaticProps = async (props) => {
  return await handleStaticProps({
    ...props,
    params: { slug: '/' },
    query,
  })
}

export default Home
