import Layout from 'pageBuilder/Layout/Layout'
import PageType from 'pageBuilder/PageType'
import ArtistSingle from 'PageTypes/Artist/ArtistSingle'
import React from 'react'

import { getAllDocPathsCached } from 'pageBuilder/queries/fetchDocPathApi'
import {
  handleStaticProps,
  handleStaticPropsResult,
} from 'pageBuilder/queries/handleStaticProps'

import { GetStaticPaths, GetStaticProps } from 'next'

import {
  ArtistPageResult,
  artistSingleView,
} from 'PageTypes/Artist/ArtistSingle.query'

const query = (locale: string) => `
        *[_type == "artist" && slug.current == $slug][0]{
          ${artistSingleView(locale)},
        }
      `

const Artist: React.FC<handleStaticPropsResult<ArtistPageResult>> = (props) => {
  return (
    <PageType {...props}>
      {(data) => (
        <Layout initialColor={'black'} title={data.name || ''}>
          <ArtistSingle {...data} />
        </Layout>
      )}
    </PageType>
  )
}

export const getStaticProps: GetStaticProps = async (props) => {
  return await handleStaticProps({ ...props, query })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('artist')
}

export default Artist
