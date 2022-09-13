import { getAllDocPathsCached } from '@lib/queries/fetchDocPathApi'
import {
  handleStaticProps,
  handleStaticPropsResult,
} from '@lib/queries/handleStaticProps'
import { usePage } from '@lib/queries/usePage'
import Error from '@pages/404'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from 'pageBuilder/Layout/Layout'
import {
  ArtistPageResult,
  artistSingleView,
} from 'PageTypes/Artist/ArtistSingle.query'
import ArtistSingle from 'PageTypes/Artist/ArtistSingle'
import React from 'react'

const query = (locale: string) => `
        *[_type == "artist" && slug.current == $slug][0]{
          ${artistSingleView(locale)},
        }
      `

const ArtworkTemplate: React.FC<handleStaticPropsResult<ArtistPageResult>> = (
  props
) => {
  const { data, slug, previewQuery } = props
  const { pageData, isError } = usePage({ slug, query: previewQuery, data })

  if (isError) {
    return <Error />
  }
  // TODO: handle init colo
  // const _initialColor = pageData?.initBgColor ? data.initBgColor : 'white'
  return (
    <Layout initialColor={'black'} title={pageData.name || ''}>
      <ArtistSingle {...pageData} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (props) => {
  return await handleStaticProps({ ...props, query })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('artist')
}

export default ArtworkTemplate
