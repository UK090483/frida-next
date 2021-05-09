// import React from "react"
// import ProductGrid from "./productGrid"
// import ProductItem from "./productItem"
// import Section from "../../components/container/section"
// import { useStaticQuery, graphql } from "gatsby"

// const Products = () => {
//   const data = useStaticQuery<GatsbyTypes.ProductGalleryQuery>(graphql`
//     query ProductGallery {
//       allShopifyProduct: allShopifyProduct2(
//         filter: { productType: { ne: "artwork" } }
//       ) {
//         nodes {
//           title
//           id
//           handle
//           variants {
//             id
//             title
//             price
//             image {
//               src
//             }
//           }
//         }
//       }
//     }
//   `)

//   return (
//     <Section type={"full"}>
//       <ProductGrid>
//         {data.allShopifyProduct.nodes.map(productItem => (
//           <ProductItem key={productItem.id} product={productItem}></ProductItem>
//         ))}
//       </ProductGrid>
//     </Section>
//   )
// }

// export default Products

export {}
