import Gallery from '@components/Gallery/Gallery'
import React from 'react'

import Section from '@components/Section'
import ArtistCard from './ArtistCard'
import Filter from '@components/Filter/Filter'
import { useRouter } from 'next/router'
import { ArtistCardResult } from './ArtistCard.query'

type ArtworksProps = {
  items?: ArtistCardResult[]
}

const ArtistGallery: React.FC<ArtworksProps> = ({ items = [] }) => {
  const router = useRouter()
  const query = router.query

  const stile = items.reduce((acc, item) => {
    if (!item.stil) return acc
    const stile = new Set([...acc, ...item.stil])
    return [...stile]
  }, [] as string[])

  const filterElements = () => {
    const res = items.filter((artist) => {
      let res = true

      if (query.stil && query.stil !== 'clear' && res) {
        res = artist.stil && artist.stil.includes(query.stil as string)
      }

      return res
    })
    return res
  }

  return (
    <>
      <Filter
        filter={[
          {
            label: 'Stil',
            name: 'stil',
            items: stile?.map((s) => ({ name: s, value: s })),
          },
        ]}
      />
      <Section type={'full'}>
        <div className="py-12">
          <Gallery
            type="grid"
            items={[
              filterElements().map((item) => (
                <ArtistCard key={item.slug} type={'grid'} {...item} />
              )),
            ]}
          />
        </div>
      </Section>
    </>
  )
}

export default ArtistGallery
