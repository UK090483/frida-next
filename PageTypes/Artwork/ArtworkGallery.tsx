import Filter from '@components/Filter/Filter'
import Gallery from '@components/Gallery/Gallery'
import { ArtworksGalleryResult } from 'pageBuilder/Blocks/ArtworkBlock'
import { useRouter } from 'next/router'
import React from 'react'
import { FridaLocation } from 'types'
import ArtworkCard from './ArtworkCard'

interface ArtworksProps extends Omit<ArtworksGalleryResult, 'type'> {
  lang: FridaLocation
}

const Artworks: React.FC<ArtworksProps> = (props) => {
  const { items, stil, medium, lang } = props
  const router = useRouter()

  const artists = [...new Set(items.map((item) => item.artistName))]

  const artistsSorted = artists.sort((a, b) => a.localeCompare(b))

  const query = router.query

  const filterElements = () => {
    const res = items.filter((artwork) => {
      let res = true
      if (query.artist && query.artist !== 'clear') {
        res = artwork.artistName === query.artist
      }
      if (query.stil && query.stil !== 'clear' && res) {
        res = artwork.stil === query.stil
      }
      if (query.medium && query.medium !== 'clear' && res) {
        res = artwork.medium === query.medium
      }
      if (
        query.price &&
        typeof query.price === 'string' &&
        query.price !== 'clear' &&
        res
      ) {
        const range = query.price.split('-')

        const isInfinit = range[1] === 'more'

        if (isInfinit) {
          res = artwork.price >= parseInt(range[0])
        } else {
          res =
            artwork.price >= parseInt(range[0]) &&
            artwork.price <= parseInt(range[1])
        }
      }
      return res
    })
    return res
  }

  return (
    <div data-color="white">
      <Filter
        filter={[
          {
            label: 'Artist',
            name: 'artist',
            items: artistsSorted?.map((s) => ({ name: s, value: s })),
          },
          {
            label: 'Stil',
            name: 'stil',
            items: stil?.map((s) => ({ name: s.name, value: s.name })),
          },
          {
            label: 'Medium',
            name: 'medium',
            items: medium?.map((s) => ({ name: s.name, value: s.name })),
          },
          {
            label: 'Price',
            name: 'price',
            items: [
              { name: '0-500', value: '0-500' },
              { name: '500-1000', value: '500-1000' },
              { name: '1000-3000', value: '1000-3000' },
              { name: '3000-5000', value: '3000-5000' },
              { name: '5000-10000', value: '5000-10000' },
              { name: '10000 - more', value: '10000-more' },
            ],
          },
        ]}
      />

      <Gallery
        items={filterElements().map((data) => (
          <ArtworkCard key={data.slug} type="masonry" {...data} lang={lang} />
        ))}
      />
    </div>
  )
}

export default Artworks
