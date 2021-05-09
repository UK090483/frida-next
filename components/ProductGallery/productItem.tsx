// import { navigate } from "gatsby"
// import PropTypes from "prop-types"
// import React from "react"
// import styled from "styled-components"
// import Frida from "../Frida"
// import { getShopifyImage } from "../fridaImage/shopifyImage"
// import { mouseLinkProps } from "../generic/Mouse/mouseRemote"
// import ProductName from "../lib/ProductComponents/ProductName"
// import Price from "../lib/ProductComponents/ProductPrice"

// function ProductItem(props) {
//   const { variants, handle, title } = props.product

//   const item = variants[0]

//   const { image, price } = item

//   const { src } = image

//   return (
//     <Root
//       onClick={() => {
//         navigate(`/product/${handle}`, { state: { modal: true } })
//       }}
//       {...mouseLinkProps}
//     >
//       <Image src={getShopifyImage(src, "500x500")}></Image>
//       <InfoWrap>
//         <PriceWrap>
//           <div className="text-sm-fluid font-bold">
//             <Frida textColor="pink" />
//           </div>
//           <Price price={price} />
//         </PriceWrap>
//         <ProductName availability={true} name={title} size={"s"} />
//       </InfoWrap>
//     </Root>
//   )
// }

// const Root = styled.div`
//   width: 100%;
//   max-width: 500px;
//   margin: 0 auto;
//   margin-bottom: 60px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   @media ${({ theme }) => theme.device.tablet} {
//     width: calc(50% - 40px);
//     margin: 0 20px;
//     margin-bottom: 60px;
//   }
//   @media ${({ theme }) => theme.device.laptopM} {
//     width: calc(33.3% - 80px);
//     margin: 0 40px;
//     margin-bottom: 80px;
//   }
// `
// const Image = styled.img`
//   width: 100%;
//   transition: opacity 0.3s;
//   margin: 0;
//   box-shadow: 0px 0px 22px -2px rgba(71, 71, 71, 0.5);
// `
// const InfoWrap = styled.div`
//   padding: 5px 0;
//   * {
//     margin-bottom: 5px;
//   }
// `
// const PriceWrap = styled.div`
//   width: 100%;
//   text-align: center;
//   display: flex;
//   justify-content: space-between;
// `

// ProductItem.propTypes = {
//   poster: PropTypes.object,
// }

// export default ProductItem

export {}
