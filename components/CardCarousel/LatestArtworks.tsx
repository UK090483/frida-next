import * as React from 'react'
import Carousel from './Carousel'
import FridaImage from '../fridaImage/FridaImage'
import ArtworkCarouselItem from './ArtworkCarouselItem'

type LatestArtworksProps = {
  items: any[]
}

const LatestArtworks: React.FC<LatestArtworksProps> = ({ items }) => {
  return (
    <Carousel
      items={[
        ...items.map((item) => {
          console.log(item)
          return (
            <ArtworkCarouselItem
              item={{
                ...item,
                image: (
                  <FridaImage
                    photo={item.photo}
                    type="sanity"
                    sanityAssetId={item.imageAssetId}
                  />
                ),
              }}
            />
          )
        }),
      ]}
    ></Carousel>
  )
}

export default LatestArtworks
