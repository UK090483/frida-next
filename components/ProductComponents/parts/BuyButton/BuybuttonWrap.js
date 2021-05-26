// import React from "react"
// import { useIntersection } from "react-use"
// import styled, { keyframes, css } from "styled-components"

// export default function BuyButtonWrap({ children }) {
//   const intersectionRef = React.useRef(null)

//   const intersection = useIntersection(intersectionRef, {
//     root: null,
//     rootMargin: "0px 0px 100% 0px",
//     threshold: 0,
//   })

//   const isOut = () => {
//     if (!intersection) {
//       return
//     }
//     return intersection.boundingClientRect.y < 0
//   }

//   return (
//     <Root ref={intersectionRef}>
//       <Inner isOut={isOut()}>{children}</Inner>
//     </Root>
//   )
// }

// const width = 600

// const AnimateIn = keyframes`
//  0% { transform:translate3d(0,-100px,0) }
//  100% { transform:translate3d(0,0,0) }
// `
// const AnimateInMob = keyframes`
//  0% { transform:translate3d(0,100px,0) }
//  100% { transform:translate3d(0,0,0) }
// `
// const Inner = styled.div`
//   ${({ isOut }) =>
//     isOut &&
//     css`
//       animation-name: ${AnimateInMob};
//       animation-duration: 0.3s;
//       animation-fill-mode: forwards;
//       position: fixed;
//       bottom: 10px;
//       left: 20px;
//       width: calc(100vw - 40px);
//       height: 70px;
//       z-index: 9999;
//     `}

//   @media ${({ theme }) => theme.device.laptopM} {
//     position: relative;
//     width: ${width}px;

//     margin-right: 80px;
//     ${({ isOut }) =>
//       isOut &&
//       css`
//       animation-name: ${AnimateIn};
//       animation-duration: 0.3s;
//       animation-fill-mode: forwards;
//       position: fixed;
//       top: 10px;
//       right:20px;
//       width:${width}px;
//       margin-left: auto;
//       z-index:9999;
//       animation
//       `}
//   }
// `

// const Root = styled.div`
//   /* height: 80px; */
// `
