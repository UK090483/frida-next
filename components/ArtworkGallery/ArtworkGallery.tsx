import React from 'react'

// import Filter from './filter/Filter'
import Section from '../container/section'

import ArtworksContainer from './artworksContainer/artworksContainer'
// import { useQueryParams, StringParam } from 'use-query-params'
import FridaImage, { ARTWORK_IMAGE_PROPS } from '../fridaImage/FridaImage'
import { ArtworkCardProps } from './artworkCard/ArtworkCard'
import { FridaLocation } from 'types'

type ArtworksProps = {
  items: any[]
  lang: FridaLocation
}

const Artworks: React.FC<ArtworksProps> = ({ items, lang }) => {
  const artworks = []

  // eslint-disable-next-line no-unused-vars
  // const [query, setQuery] = useQueryParams({
  //   artist: StringParam,
  //   stil: StringParam,
  //   medium: StringParam,
  //   price: StringParam,
  // })

  let query = {}

  // const filterElements = () => {
  //   let res = items.filter((artwork) => {
  //     let res = true
  //     if (query.artist) {
  //       res = artwork.artistName === query.artist
  //     }
  //     if (query.stil && res) {
  //       res = artwork.stil === query.stil
  //     }
  //     if (query.medium && res) {
  //       res = artwork.medium === query.medium
  //     }
  //     if (query.price && res) {
  //       let range = query.price.split('-')

  //       res =
  //         artwork.price >= parseInt(range[0]) &&
  //         artwork.price <= parseInt(range[1])
  //     }
  //     return res
  //   })
  //   return res
  // }

  return (
    <>
      <div id={'filter'} style={{ transform: 'translateY(-10vh)' }}></div>
      <Section type={'full'}>
        {/* <Filter artworks={artworks}></Filter> */}
        <div className="py-12">
          <ArtworksContainer
            artworks={items.map((artwork) => {
              // console.log(artwork)

              const res: ArtworkCardProps['artwork'] = {
                availability:
                  artwork.availability === 'availabil' ? 'availabil' : 'sold',
                artistName: artwork.artistName,
                artworkName: artwork.artworkName,
                price: artwork.price,
                banner: artwork.banner,
                slug: artwork.slug as string,

                image: (
                  <FridaImage
                    layoutId="image"
                    type="sanity"
                    sanityAssetId={artwork.imageAssetId}
                    photo={artwork.photo}
                    {...ARTWORK_IMAGE_PROPS}
                  />
                ),
              }

              return res
            })}
          ></ArtworksContainer>
        </div>
      </Section>
    </>
  )
}

// function usePreparedData() {
//   const data = useStaticQuery<GatsbyTypes.ArtworkGalleryQuery>(graphql`
//     query ArtworkGallery {
//       allFridaArtwork(sort: { fields: ransortNumber, order: DESC }) {
//         nodes {
//           shopifyProduct {
//             images {
//               src
//             }
//           }
//           uuid
//           slug
//           artistName
//           artworkName
//           availability
//           height
//           price
//           stil
//           medium
//           banner
//           image {
//             imageAssetId
//           }
//         }
//       }
//     }
//   `)

//   return data.allFridaArtwork.nodes
// }
export default Artworks
