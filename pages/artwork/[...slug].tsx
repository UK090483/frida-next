import Layout from 'pageBuilder/Layout/Layout'
import { usePage } from '@lib/queries/usePage'
import query, {
  ArtworkSingleViewResult,
} from 'PageTypes/Artwork/ArtworkSingle/artworksQueries'
import { getAllDocPathsCached } from '@lib/queries/fetchDocPathApi'
import {
  handleStaticProps,
  handleStaticPropsResult,
} from '@lib/queries/handleStaticProps'
import Error from '@pages/404'
import ArtworkSingle from 'PageTypes/Artwork/ArtworkSingle/ArtworkSingle'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import getServerResource from 'pageBuilder/Api/getResource.server'

const ArtworkTemplate: React.FC<
  handleStaticPropsResult<ArtworkSingleViewResult>
> = (props) => {
  const { data, slug, previewQuery } = props

  const { pageData, isError } = usePage({ slug, query: previewQuery, data })
  if (!pageData || isError) return <Error />

  return (
    <Layout title={pageData.artistName || 'Frida'}>
      <ArtworkSingle {...pageData} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (props) => {
  const res = await handleStaticProps({ ...props, query })
  //@ts-ignore
  if (res?.props?.data?.randomArtworks) {
    console.log('has random ')
    const randomArtworks = await getServerResource({
      type: 'artworks',
      count: 8,
    })

    if (randomArtworks && randomArtworks.length > 0) {
      //@ts-ignore
      res.props.data.randomArtworks = randomArtworks
    }
  }

  return res
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached(
    'artwork',
    '&& (defined(shopify_variant_id) || isNft)'
  )
}

export default ArtworkTemplate
