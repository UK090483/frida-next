import React from 'react'

import { getIndexPage } from '@lib/queries/pageQueries'

import Page from 'pageBuilder/Page'
import { GetStaticProps } from 'next'
import { FridaLocation } from 'types'

type HomeProps = {
  data: any
  lang: FridaLocation
}

const Home: React.FC<HomeProps> = ({ data, lang }) => {
  return <Page lang={lang} data={data} />
}

export const getStaticProps: GetStaticProps = async (props) => {
  const { preview, previewData, locale } = props

  const pageData = await getIndexPage('', {
    active: preview, //@ts-ignore
    token: previewData?.token,
  })

  return {
    props: {
      data: pageData,
      lang: locale,
    },
  }
}

export default Home
