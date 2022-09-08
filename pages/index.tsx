import { handleStaticProps } from '@lib/queries/handleStaticProps'
import { usePage } from '@lib/queries/usePage'
import Error from '@pages/404'
import Page from 'PageTypes/Page/Page'
import { PageResult } from 'PageTypes/Page/pageQueries'
import { GetStaticProps } from 'next'
import React from 'react'
import { FridaLocation } from 'types'
import { pageQuery } from '../PageTypes/Page/pageQueries'

type HomeProps = {
  data: PageResult | null
  lang: FridaLocation
  preview: boolean
}
const query = `*[_type == 'indexPage'  && _id == 'frontPage'][0]{
  ${pageQuery},
}
`

const Home: React.FC<HomeProps> = ({ data, lang, preview }) => {
  return null
  const { pageData, isError } = usePage({ slug: '/', query, data, preview })

  if (isError) return <Error />
  return <Page lang={lang} data={pageData} preview={preview} />
}

export const getStaticProps: GetStaticProps = async (props) => {
  return await handleStaticProps({ ...props, params: { slug: '/' }, query })
}

export default Home
