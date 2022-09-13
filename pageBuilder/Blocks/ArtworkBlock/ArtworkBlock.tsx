import Carousel from '@components/CardCarousel'
import ArtworkCard from 'PageTypes/Artwork/ArtworkCard'
import Artworks from 'PageTypes/Artwork/ArtworkGallery'
import React from 'react'
import { ArtworksGalleryResult } from './ArtworkBlock.query'

const ArtworksBlock: React.FC<ArtworksGalleryResult> = (props) => {
  const { items = [], type, label } = props

  if (type === 'masonry') {
    return <Artworks {...props} />
  }

  return (
    <Carousel
      header={label}
      items={items.map((item) => (
        <ArtworkCard key={item.slug} type="carousel" {...item} />
      ))}
    />
  )
}

export default ArtworksBlock
