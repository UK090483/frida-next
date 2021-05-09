import React from 'react'
import LatestArtworks from '@components/CardCarousel/LatestArtworks'

const ArtworkCarouselBlock: React.FC<{ items: any[] }> = ({ items }) => {
  return <LatestArtworks items={items} />
}

export default ArtworkCarouselBlock
