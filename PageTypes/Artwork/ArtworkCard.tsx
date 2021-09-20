import Card from '@components/Card'
import ProductName from '@components/ProductComponents/ProductName'
import Price from '@components/ProductComponents/ProductPrice'
import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import React from 'react'
import { FridaLocation, GalleryTypes } from 'types'
import Banner from './banner'

export const artworkCardQuery = `
    _updatedAt,
    isNft,
    ethPrice,
    'imageAssetId':image.asset._ref,
    availability,
    'artistName':artist->anzeigeName,
    'slug': slug.current,
    banner,
    'price': price,
    'artworkName':name,
    'photo': image {
      ${imageMeta}
    },
    'stil':stil->name,
    'medium':medium->name
       
`
export type ArtworkCardResult = {
  _updatedAt: string
  imageAssetId: string
  availability: string
  isNft: boolean | null
  ethPrice: number | null
  artistName: string
  slug: string
  banner: string
  price: number
  artworkName: string
  photo: ImageMetaResult
  stil: string
  medium: string
}

interface ArtworkCardProps extends ArtworkCardResult {
  type: GalleryTypes
  isSwiping?: boolean
  lang: FridaLocation
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
    lang,

    isNft,
  } = props

  if (!photo) return null

  const ariaLabel =
    lang === 'en'
      ? `Read more aboute the Artwork ${artworkName} by ${artistName}`
      : `Lies mehr über das Kunstwerk ${artworkName} von ${artistName}`

  return (
    <Card
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
