// import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
// import Marquee from "react-marquee-slider"
// import styled from "styled-components"

// const AllSuporters = () => {
//   const data = useStaticQuery<GatsbyTypes.AllSupportersQueryQuery>(graphql`
//     query AllSupportersQuery {
//       allFile(
//         filter: {
//           relativeDirectory: { regex: "/AllSupporter/(supporter|kooperation)/" }
//         }
//         sort: { order: ASC, fields: childImageSharp___original___src }
//       ) {
//         edges {
//           node {
//             childImageSharp {
//               resize(width: 500) {
//                 src
//               }
//             }
//             id
//           }
//         }
//       }
//     }
//   `)
//   return <PureAllSupporters data={data} />
// }

// export default AllSuporters

// const PureAllSupporters = ({ data }) => {
//   return (
//     <Marquee velocity={80}>
//       {data.allFile.edges.map(item => {
//         return (
//           <LogoItem key={item.node.id}>
//             <img
//               style={{ maxWidth: "100%" }}
//               alt={"Logo"}
//               src={item.node.childImageSharp.resize.src}
//             ></img>
//           </LogoItem>
//         )
//       })}
//     </Marquee>
//   )
// }

// const LogoItem = styled.div`
//   height: 150px;
//   width: 30vw;
//   img {
//     object-fit: contain;
//   }
//   @media ${({ theme }) => theme.device.tablet} {
//     height: 300px;
//     width: 20vw;
//   }
// `
export {}
