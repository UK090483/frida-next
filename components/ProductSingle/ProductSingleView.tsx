// import React from "react"
// import styled from "styled-components"
// import {
//   LoupImage,
//   BuyButton,
//   BuyButtonWrap,
//   ImagePreview,
//   Options,
//   Quantity,
// } from "~components/lib/ProductComponents"

// import useShopify from "~components/hooks/useShopify"
// import SocialShare from "../SocialShare/SocialShare"
// import { getShopifyImage } from "../fridaImage/shopifyImage"

// import PaymentInfo from "../lib/ProductComponents/PaymentInfo"
// import Price from "../lib/ProductComponents/ProductPrice"
// import ProductHeroWrap from "../lib/ProductComponents/ProductHeroWrap"
// import ProductImageWrap from "../lib/ProductComponents/ProductHeroImageWrap"
// import ProductInfoWrap from "../lib/ProductComponents/ProductHeroInfoWrap"
// import ProductName from "../lib/ProductComponents/ProductName"

// export default function SingleView({ data }) {
//   const {
//     variant,
//     hasOptions,
//     imagesArray,
//     onImageClick,
//     selectedOption,
//     setOption,
//     title,
//     description,
//     options,
//     activeImage,
//     quantity,
//     setQuantity,
//     inCart,
//     addToCart,
//     availability,
//     checkoutUrl,
//   } = useShopify(data)

//   const { src } = activeImage
//   const { price } = variant

//   return (
//     <ProductHeroWrap>
//       <ProductImageWrap>
//         <LoupImage
//           smallImageSrc={getShopifyImage(src, "500x500")}
//           bigImageSrc={getShopifyImage(src, "2000x2000")}
//           alt={`artwork ${title}`}
//         />

//         {imagesArray.length > 1 && (
//           <ImagePreview images={imagesArray} handleClick={onImageClick} />
//         )}
//       </ProductImageWrap>
//       <ProductInfoWrap>
//         <Groupe>
//           <ProductName name={title} availability={availability} size="m" />
//           <Price price={price} />
//           <Description>{description}</Description>

//           <ControlesWrap>
//             <Quantity
//               quantity={quantity}
//               setQuantity={setQuantity}
//               quantityAvailable={variant.quantityAvailable}
//             />
//             <SocialShare />
//             {hasOptions && (
//               <Options
//                 options={options}
//                 setOption={setOption}
//                 selectedOption={selectedOption}
//               />
//             )}
//           </ControlesWrap>
//           <Spacer />
//           <BuyButtonWrap>
//             <BuyButton
//               checkoutUrl={checkoutUrl}
//               availability={availability}
//               addToCart={addToCart}
//               inCart={inCart}
//             />
//           </BuyButtonWrap>
//         </Groupe>
//         <PaymentInfo />
//       </ProductInfoWrap>
//     </ProductHeroWrap>
//   )
// }

// const ControlesWrap = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `

// const Groupe = styled.div`
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `
// const Description = styled.p`
//   height: fit-content;
//   max-height: 130px;
//   overflow: auto;
//   font-size: 20px;
//   margin: 0;
//   padding: 0;
// `
// const Spacer = styled.div`
//   height: 20px;
// `

export {}
