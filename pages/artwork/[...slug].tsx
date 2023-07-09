import Layout from 'pageBuilder/Layout/Layout'
import query, {
  ArtworkSingleViewResult,
} from 'PageTypes/Artwork/ArtworkSingle/Artwork.query'
import { getAllDocPathsCached } from 'pageBuilder/queries/fetchDocPathApi'
import {
  handleStaticProps,
  handleStaticPropsResult,
} from 'pageBuilder/queries/handleStaticProps'

import ArtworkSingle from 'PageTypes/Artwork/ArtworkSingle/ArtworkSingle'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import getServerResource from 'pageBuilder/Api/getResource.server'
import PageType from 'pageBuilder/PageType'

const Artwork: React.FC<handleStaticPropsResult<ArtworkSingleViewResult>> = (
  props
) => {
  return (
    <PageType {...props}>
      {(data) => (
        <Layout>
          <ArtworkSingle {...data} />
        </Layout>
      )}
    </PageType>
  )
}

export const getStaticProps: GetStaticProps = async (props) => {
  const res = await handleStaticProps({ ...props, query })
  // //@ts-ignore
  // if (res?.props?.data?.randomArtworks) {
  //   console.log('has random ')
  //   const randomArtworks = await getServerResource({
  //     type: 'artworks',
  //     count: 8,
  //   })

  //   if (randomArtworks && randomArtworks.length > 0) {
  //     //@ts-ignore
  //     res.props.data.randomArtworks = randomArtworks
  //   }
  // }

  return res
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached(
    'artwork',
    '&& (defined(shopify_variant_id) || isNft)'
  )
}

export default Artwork
