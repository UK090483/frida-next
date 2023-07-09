import React from 'react'
import GoogleSearchResult from './google-search'
import TwitterCard from './twitter-card'
import FacebookShare from './facebook-share'
import sanityClient from 'part:@sanity/base/client'

import { seoQuery as ArtworkSeoQuery } from '../../../../PageTypes/Artwork/ArtworkSingle/Artwork.seoQuery'
import { seoQuery as ArtistSeoQuery } from '../../../../PageTypes/Artist/ArtistSingle.seoQuery'
import { buildSeoQuery, seoResult } from '../../../../pageBuilder/Seo/seoQuery'
export type SeoProps = Partial<seoResult>

const queryList = {
  artwork: ArtworkSeoQuery,
  artist: ArtistSeoQuery
}

const SeoPreviews = props => {
  const type = props?.document?.displayed?._type
  const query = (type && queryList[type]) || buildSeoQuery()

  const [seo, setSeo] = React.useState<seoResult | {}>({})
  const loadData = () => {
    sanityClient
      .fetch(`*[_id == '${props.documentId}'][0]{${query}}`)
      .then(res => {
        setSeo(res.seo)
      })
  }
  React.useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <GoogleSearchResult {...seo} width={500} />
      <FacebookShare {...seo} width={500} />
      <TwitterCard {...seo} width={500} />
    </>
  )
}

export default SeoPreviews
