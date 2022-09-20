import React from 'react'

import Carousel from '@components/CardCarousel'
import { useArtists } from 'pageBuilder/Api/useResource'
import ArtistCard from 'PageTypes/Artist/ArtistCard'
import ArtistGallery from 'PageTypes/Artist/ArtistGallery'
import { ArtistsGalleryResult } from './ArtistsBlock.query'

const ArtworksBlock: React.FC<ArtistsGalleryResult> = (props) => {
  const { items = [], type, label, bgColor = 'white' } = props
  const [fetchArtists] = useArtists({ count: 20 })
  const _items = fetchArtists.length > 0 ? fetchArtists : items

  if (type === 'masonry') {
    return <ArtistGallery items={items} />
  }

  return (
    <Carousel
      bgColor={bgColor}
      header={label}
      items={_items.map((item) => (
        <ArtistCard key={item.slug} type={type} {...item} />
      ))}
    />
  )
}

export default ArtworksBlock
