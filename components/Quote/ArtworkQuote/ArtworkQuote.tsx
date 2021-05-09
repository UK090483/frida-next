// import React from "react"
// import styled from "styled-components"
// import FridaImage from "../../fridaImage/FridaImage"

// export default function ArtworkQuote({ quote: quoteObject }) {
//   const { quote, image, author, subtitle } = quoteObject

//   return (
//     <Root>
//       <Collumn1>
//         <QuoteWrap>"{quote}"</QuoteWrap>
//         <AutorWrap>{author}</AutorWrap>
//         <SubTitleWrap>{subtitle}</SubTitleWrap>
//       </Collumn1>
//       <Collumn2>
//         <FridaImage
//           alt={"alt"}
//           sanityAssetId={image}
//           style={{ width: "300px" }}
//         />
//       </Collumn2>
//     </Root>
//   )
// }

// const Root = styled.div`
//   display: flex;
//   flex-wrap: wrap-reverse;

//   width: 100%;
//   background-color: ${({ theme }) => theme.colors.black};

//   @media ${({ theme }) => theme.device.tablet} {
//     flex-wrap: nowrap;
//   }
// `
// const Collumn1 = styled.div`
//   width: 100%;
//   @media ${({ theme }) => theme.device.tablet} {
//     width: 70%;
//   }
// `
// const Collumn2 = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   /* img {
//     width: 100%;
//     height: 100%;
//   } */
//   @media ${({ theme }) => theme.device.tablet} {
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
