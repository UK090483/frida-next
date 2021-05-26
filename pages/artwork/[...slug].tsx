import Layout from '@components/generic/layout/layout'
import { usePage } from '@lib/queries/usePage'
import {
  artworkSingleViewQuery,
  ArtworkSingleViewResult,
} from 'contentTypes/Artwork/ArtworkSingle/artworksQueries'
import { getAllDocPathsCached } from '@lib/queries/fetchDocPathApi'
import { handleStaticProps } from '@lib/queries/handleStaticProps'
import Error from '@pages/404'
import ArtworkSingle from 'contentTypes/Artwork/ArtworkSingle/ArtworkSingle'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { FridaLocation } from 'types'

type ArtworkTemplateProps = {
  data: ArtworkSingleViewResult | null
  lang: FridaLocation
  preview: boolean
  slug: any
}

const query = `*[_type == "artwork" && slug.current == $slug][0]{
  ${artworkSingleViewQuery}
}`

const ArtworkTemplate: React.FC<ArtworkTemplateProps> = (props) => {
  const { data, lang, slug } = props
  const { pageData, isError } = usePage({ slug, query, data })

  if (isError) return <Error />

  return (
    <Layout
      lang={lang}
      title={pageData.artistName || 'Frida'}
      navItems={pageData.site.navigation.items}
      data={pageData}
    >
      <ArtworkSingle lang={lang} {...pageData} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  return await handleStaticProps({ params, locale, query })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('artwork')
}

export default ArtworkTemplate
