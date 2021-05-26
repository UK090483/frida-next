import { usePage } from '@lib/queries/usePage'
import { page } from '@lib/queries/pageQueries'
import Page from 'contentTypes/Page/Page'
import { GetStaticProps } from 'next'
import React from 'react'
import { FridaLocation } from 'types'
import Error from '@pages/404'
import { handleStaticProps } from '@lib/queries/handleStaticProps'

type HomeProps = {
  data: any
  lang: FridaLocation
}
const query = `*[_type == 'indexPage'][0]{
  ${page}
}
`

const Home: React.FC<HomeProps> = ({ data, lang }) => {
  const { pageData, isError } = usePage({ slug: '/', query, data })

  if (isError) return <Error />
  return <Page lang={lang} data={pageData} />
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return await handleStaticProps({ params: { slug: '/' }, locale, query })
}

export default Home
