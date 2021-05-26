/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import GoogleSearchResult from './google-search'
import TwitterCard from './twitter-card'
import FacebookShare from './facebook-share'

import sanityClient from 'part:@sanity/base/client'

const SeoPreviews = props => {
  const [state, setState] = React.useState({ defaultSEO: {}, document: {} })
  const loadData = () => {
    sanityClient
      .fetch(
        `
        *[_type == "seoSettings"][0]{
          siteTitle,
          metaTitle,
          metaDesc,
          shareTitle,
          shareDesc,
          shareGraphic
        }
      `
      )
      .then(seo => {
        setState(od => ({ ...od, defaultSEO: seo || {} }))
      })
  }

  const loadExtraData = id => {
    sanityClient
      .fetch(
        `
        *[_id == '${id}'][0]{
          'artistName':artist->name,
          'artworkName':name,
          'slug':slug.current,
          'photo':image
        }
      `
      )
      .then(data => {
        setState(od => ({ ...od, document: data }))
      })
  }

  React.useEffect(() => {
    loadData()
  }, [])
  React.useEffect(() => {
    if (props.document.displayed._type === 'artwork') {
      loadExtraData(props.document.displayed._id)
    }
  }, [props.document.displayed])

  const { options } = props

  const { defaultSEO } = state

  const displayed = { ...props.document.displayed, ...state.document }

  return (
    <>
      <GoogleSearchResult
        default={defaultSEO}
        document={displayed}
        options={options}
      />
      <TwitterCard
        default={defaultSEO}
        document={displayed}
        options={options}
      />
      <FacebookShare
        default={defaultSEO}
        document={displayed}
        options={options}
      />
    </>
  )
}

export default SeoPreviews
