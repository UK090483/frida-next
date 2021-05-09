// import React from "react"
// import styled from "styled-components"
// import Frida from "../Frida"
// import ArtworkInfo from "../ArtworkGallery/artworkCard/ArtworkInfo"
// import Banner from "../ArtworkGallery/artworkCard/banner"
// import { Link, navigate } from "gatsby"
// import { ArtworkRecord } from "~/types"

// export interface ArtistCarouselItemData
//   extends Pick<
//     ArtworkRecord,
//     | "id"
//     | "availability"
//     | "artistName"
//     | "artworkName"
//     | "banner"
//     | "price"
//     | "slug"
//   > {
//   image: React.ReactNode
// }

// type ArtistCarouselItemProps = {
//   item: ArtistCarouselItemData
//   isSwiping?: boolean
// }

// const ArtistCarouselItem: React.FC<ArtistCarouselItemProps> = ({
//   item,
//   isSwiping,
// }) => {
//   const {
//     availability,
//     artworkName,
//     artistName,
//     price,
//     image,
//     banner,
//     slug,
//   } = item

//   return (
//     <div
//       onClick={() => {
//         !isSwiping && navigate(`/artwork/${slug}`)
//       }}
//       className="relative mx-auto p-4 w-96 bg-frida-white  transform scale-75 md:scale-100"
//     >
//       <Link to={`/artwork/${slug}`}></Link>

//       {image}
//       {banner === "hinzundkunzt" && <Banner></Banner>}
//       <div className="text-lg font-bold mt-3">
//         <Frida text={artistName} textColor={"pink"}></Frida>
//       </div>

//       <ArtworkInfo
//         availability={availability}
//         price={price}
//         artworkName={artworkName}
//       />
//     </div>
//   )
// }

// const ArtistName = styled.h3`
//   font-size: 1rem;
//   margin-bottom: 5px;
//   @media ${({ theme }) => theme.device.tablet} {
//     font-size: 1.35rem;
//   }
// `
// ArtistName.defaultProps = {
//   theme: {
//     device: { tablet: 100 },
//   },
// }

// export default React.memo(ArtistCarouselItem)

export {}
