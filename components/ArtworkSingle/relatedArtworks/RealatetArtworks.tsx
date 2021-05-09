import React from 'react'
import Carousel from '../../CardCarousel/Carousel'
import { FridaColors } from 'types'
import FridaImage from '@components/fridaImage/FridaImage'
import ArtworkCarouselItem from '@components/CardCarousel/ArtworkCarouselItem'

type RelatedArtworksProps = {
  artworks: any
  bgColor: FridaColors
  header: string
}

const RelatedArtworks: React.FC<RelatedArtworksProps> = ({
  artworks,
  header,
  bgColor = 'grey',
}) => {
  return (
    <div color={bgColor} data-color={bgColor}>
      <div
        className={`text-lg-fluid  bg-frida-${bgColor} font-bold section_padding pt-14`}
      >
        {header}
      </div>
      <Carousel
        bgColor={bgColor}
        items={artworks.map((item: any) => {
          return (
            <ArtworkCarouselItem
              item={{
                ...item,
                image: (
                  <FridaImage
                    type="sanity"
                    sanityAssetId={item.image?.imageAssetId}
                    photo={item.photo}
                  />
                ),
              }}
            />
          )
        })}
      />
    </div>
  )
}

export default RelatedArtworks
