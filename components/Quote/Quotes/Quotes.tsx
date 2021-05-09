// import React from "react"
// import styled from "styled-components"
// import { useStaticQuery, graphql } from "gatsby"
// import Quote from "./Quote"
// import { Carousel, CarouselItem } from "../../lib/Carousel"

// const breakpoints = {
//   320: {
//     slidesPerView: 1,
//     spaceBetween: 0,
//   },
// }

// export default function Quotes() {
//   const data = useStaticQuery<GatsbyTypes.quotesQuerryQuery>(graphql`
//     query quotesQuerry {
//       allFridaQuote {
//         nodes {
//           artworkSlug
//           artworkImage
//           id
//           author
//           subtitle
//           quote
//           image
//         }
//       }
//     }
//   `)

//   return (
//     <Root data-color={"black"}>
//       <Carousel
//         breakpoints={breakpoints}
//         loop={true}
//         autoHeight={false}
//         uiColor="bright"
//       >
//         {data.allFridaQuote.nodes.map((quote, index) => (
//           <CarouselItem key={index}>
//             <Quote quote={quote} />
//           </CarouselItem>
//         ))}
//       </Carousel>
//     </Root>
//   )
// }

// const Root = styled.div`
//   background-color: ${({ theme }) => theme.colors.black};
// `

export {}
