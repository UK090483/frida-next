import { extraData, getIndexPage } from '@lib/queries/pageQueries'
import Page from 'contentTypes/Page/Page'
import { GetStaticProps } from 'next'
import React from 'react'
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

  const pageData = await getIndexPage('/', {
    active: preview, //@ts-ignore
    token: previewData?.token,
  })

  const withExtraData = await extraData(pageData)

  return {
    props: {
      data: withExtraData,
      lang: locale,
    },
  }
}

export default Home
