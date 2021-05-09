import React from 'react'

import { ArtworkRecord, FridaColors } from '../../../types'
import ArtworkCardWrap from './ArtworkCardWrap'
import ArtworkInfo from './ArtworkInfo'
import Banner from './banner'
import Frida from '@components/Frida'

export type ArtworkCardProps = {
  artwork: {
    availability: ArtworkRecord['availability']
    artistName: ArtworkRecord['artistName']
    artworkName: ArtworkRecord['artworkName']
    price: ArtworkRecord['price']
    banner: ArtworkRecord['banner']
    slug: ArtworkRecord['slug']
    image: React.ReactNode
  }
  color?: FridaColors
  preventClick?: boolean
  reactOnMouseDown?: boolean
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  color = 'pink',
  preventClick,
  reactOnMouseDown,
}) => {
  const {
    availability,
    artworkName,
    artistName,
    price,
    banner,
    slug,
    image,
  } = artwork

  return (
    <ArtworkCardWrap
      slug={slug}
      preventClick={preventClick}
      reactOnMouseDown={reactOnMouseDown}
    >
      {image}

      {banner === 'hinzundkunzt' && <Banner></Banner>}
      <div className={'text-xl font-extrabold mt-5'}>
        <Frida text={artistName} textColor={color}></Frida>
      </div>

      <ArtworkInfo
        availability={availability}
        price={price}
        artworkName={artworkName}
      />
    </ArtworkCardWrap>
  )
}

export default ArtworkCard
