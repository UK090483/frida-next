import { ArtistPageResult } from '@pages/artist/[...slug]'
import { ArtworkSingleViewResult } from 'PageTypes/Artwork/ArtworkSingle/artworksQueries'
import { PageResult } from 'PageTypes/Page/pageQueries'
import React from 'react'

const generateSchema = (
  data: PageResult | ArtworkSingleViewResult | ArtistPageResult
) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default generateSchema
