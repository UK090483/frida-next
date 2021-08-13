import Card from '@components/Card'
import ProductName from '@components/ProductComponents/ProductName'
import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import React from 'react'
import { GalleryTypes } from 'types'
import Banner from './banner'

export const artworkCardQuery = `

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
  imageAssetId: string
  availability: string
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
}

const ArtworkCard: React.FC<ArtworkCardProps> = (props) => {
  const {
    isSwiping,
    artworkName,
    photo,
    slug,
    banner,
    artistName,
    availability,
    price,
    type = 'grid',
  } = props

  if (!photo) return null

  return (
    <Card
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
        <div className="pl-2 ml-auto text-right text-sm-fluid">{price}€</div>
      </div>
    </Card>
  )
}

export default ArtworkCard
