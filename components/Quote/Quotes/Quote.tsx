// import React, { useState } from "react"
// import styled from "styled-components"

// import { navigate } from "gatsby"
// import { setMouse } from "../../generic/Mouse/mouseRemote"
// import FridaImage from "../../fridaImage/FridaImage"

// type QuoteProps = {}

// const Quote: React.FC<QuoteProps> = ({ quote: quoteObject }) => {
//   const {
//     quote,
//     image,
//     author,
//     subtitle,
//     artworkImage,
//     artworkSlug,
//   } = quoteObject

//   const [hover, setHover] = useState(false)

//   return (
//     <Root
//       data-color={"black"}
//       onMouseLeave={() => {
//         setHover(false)
//         setMouse("link", false)
//       }}
//       onMouseEnter={() => {
//         setHover(true)
//         setMouse("link", true)
//       }}
//       onClick={() => {
//         navigate(`artwork/${artworkSlug}`)
//       }}
//     >
//       <Collumn1>
//         <QuoteWrap>"{quote}"</QuoteWrap>
//         <AutorWrap>{author}</AutorWrap>
//         <SubTitleWrap>{subtitle}</SubTitleWrap>
//       </Collumn1>
//       <Collumn2>
//         <ArtworkImage hover={hover}>
//           <FridaImage
//             type="sanity"
//             sanityAssetId={artworkImage}
//             style={{ width: "100%" }}
//           />
//         </ArtworkImage>

//         {/* {image && (
//           // <AuthorImage
//           //   hover={hover}
//           //   style={{
//           //     backgroundImage: `url(${urlFor(image).width(300).url()})`,
//           //   }}
//           // ></AuthorImage>
//         )} */}
//       </Collumn2>
//     </Root>
//   )
// }

// export default Quote

// const AuthorImage = styled.div`
//   width: 50vw;
//   height: 50vw;
//   max-width: 250px;
//   max-height: 250px;
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: bottom;
//   position: absolute;
//   left: 20px;
//   bottom: 0;
//   transition: transform 0.3s;
//   ${({ hover }) => hover && "transform: scale(1.05) translate3d(-20px,0,0);"};
// `
// const ArtworkImage = styled.div`
//   width: 50%;
//   max-width: 200px;
//   padding: 30px 0;
//   transition: transform 0.3s;
//   ${({ hover }) => hover && "transform: scale(1.05) translate3d(20px,0,0);"};
// `

// const Root = styled.div`
//   display: flex;
//   flex-wrap: wrap-reverse;
//   padding-bottom: 50px;
//   width: 100%;
//   background-color: ${({ theme }) => theme.colors.black};

//   @media ${({ theme }) => theme.device.laptopM} {
//     flex-wrap: nowrap;
//     padding-bottom: 100px;
//   }
// `
// const Collumn1 = styled.div`
//   width: 100%;
//   @media ${({ theme }) => theme.device.laptopM} {
//     width: 70%;
//   }
// `
// const Collumn2 = styled.div`
//   width: 100%;
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   @media ${({ theme }) => theme.device.laptopM} {
//     width: 30%;
//   }
// `

// const QuoteWrap = styled.p`
//   margin: 0;
//   color: ${({ theme }) => theme.colors.pink};
//   padding: 20px;
//   @media ${({ theme }) => theme.device.tablet} {
//     padding: 40px 40px 10px 40px;
//   }
// `
// const AutorWrap = styled.h6`
//   margin: 0;
//   padding: 0 20px 0 20px;
//   color: ${({ theme }) => theme.colors.white};
//   @media ${({ theme }) => theme.device.tablet} {
//     padding: 40px 0 10px 40px;
//   }
// `
// const SubTitleWrap = styled.p`
//   margin: 0;
//   padding: 0 20px 20px 20px;
//   color: ${({ theme }) => theme.colors.white};
//   @media ${({ theme }) => theme.device.tablet} {
//     padding: 0 0 40px 40px;
//   }
// `

export {}
