import Card from '@components/Card'
import ProductName from '@components/ProductComponents/ProductName'
import Price from '@components/ProductComponents/ProductPrice'
import { useRouter } from 'next/router'
import React from 'react'
import { GalleryTypes } from 'types'
import { ArtworkCardResult } from './ArtworkCard.query'
import Banner from './banner'

interface ArtworkCardProps extends ArtworkCardResult {
  type: GalleryTypes
  isSwiping?: boolean
}

const ArtworkCard: React.FC<ArtworkCardProps> = (props) => {
  const {
    ethPrice,
    isSwiping,
    artworkName,
    photo,
    slug,
    banner,
    artistName,
    availability,
    price,
    type = 'grid',
    isNft,
  } = props
  const { locale } = useRouter()
  if (!photo) return null

  const ariaLabel =
    locale === 'en'
      ? `Read more aboute the Artwork ${artworkName} by ${artistName}`
      : `Lies mehr über das Kunstwerk ${artworkName} von ${artistName}`

  return (
    <Card
      testId="artwork__card"
      badge={isNft ? 'NFT' : undefined}
      ariaLabel={ariaLabel}
      isSwiping={!!isSwiping}
      slug={slug}
      type="artwork"
      galleryType={type}
      photo={photo}
      title={artistName}
      alt={`Artwork ${artworkName} by ${artistName}`}
      banner={banner === 'hinzundkunzt' ? <Banner></Banner> : undefined}
    >
      <div className={`flex text-xl pt-4`}>
        <ProductName
          truncate
          size={'m'}
          name={artworkName}
          availability={availability === 'availabil'}
        />

        <div className="pl-2 ml-auto text-right ">
          <Price
            price={isNft && ethPrice ? ethPrice : price}
            size="s"
            currency={isNft && ethPrice ? ' ETH' : undefined}
          />
        </div>
      </div>
    </Card>
  )
}

export default ArtworkCard
