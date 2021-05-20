import CardWrap from '@components/CardCarousel/CardWrap'
import Frida from '@components/Frida'
import FridaImage, {
  ARTWORK_IMAGE_PROPS,
} from '@components/fridaImage/FridaImage'
import ProductName from '@components/lib/ProductComponents/ProductName'

import { ImageMetaResult, imageMeta } from '@lib/queries/snippets'
// import { ArtworkCardResult } from '@lib/queries/snippets'
import React from 'react'
import { GalleryTypes } from 'types'
import Banner from './banner'

export const artworkCardQuery = `

    'imageAssetId':image.asset._ref,
    availability,
    'artistName':artist->anzeigeName,
    'slug': slug.current,
    banner,
    'price': round(price*1.16),
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
    <CardWrap
      isSwiping={isSwiping}
      slug={slug}
      type="artwork"
      galleryType={type}
    >
      <FridaImage
        {...ARTWORK_IMAGE_PROPS}
        photo={photo}
        className={type === 'carousel' ? 'aspect-w-9 aspect-h-12' : `w-full`}
        layout={type === 'carousel' ? 'contain' : 'intrinsic'}
      />

      {banner === 'hinzundkunzt' && <Banner></Banner>}
      <div className="text-lg font-bold mt-3">
        <Frida text={artistName} textColor={'pink'}></Frida>
      </div>

      <div className="flex flex-wrap text-xl pt-5">
        <ProductName
          size={'m'}
          name={artworkName}
          availability={availability === 'availabil'}
        />
        <div className="pl-2 ml-auto text-right">{price}€</div>
      </div>
    </CardWrap>
  )
}

export default ArtworkCard
