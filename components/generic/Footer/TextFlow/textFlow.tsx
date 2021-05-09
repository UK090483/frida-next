// import React from "react"
// import { Link } from "gatsby"
// import styled, { keyframes } from "styled-components"
// import { setMouse } from "../../Mouse/mouseRemote"
// export default function TextFlow() {
//   return (
//     <Link
//       to="/unterstützen/"
//       onMouseEnter={() => {
//         setMouse("link", true)
//       }}
//       onMouseLeave={() => {
//         setMouse("link", false)
//       }}
//       style={{ textDecoration: "none" }}
//     >
//       <Root>
//         <Inner>
//           <Text>
//             SUPPORTER WERDEN! SUPPORTER WERDEN! SUPPORTER WERDEN! SUPPORTER
//             WERDEN! SUPPORTER WERDEN! SUPPORTER WERDEN! SUPPORTER WERDEN!
//             SUPPORTER WERDEN! SUPPORTER WERDEN! SUPPORTER WERDEN! SUPPORTER
//             WERDEN! SUPPORTER WERDEN! SUPPORTER WERDEN! SUPPORTER WERDEN!
//             SUPPORTER WERDEN! SUPPORTER WERDEN! SUPPORTER WERDEN! SUPPORTER
//             WERDEN! SUPPORTER WERDEN! SUPPORTER WERDEN! SUPPORTER WERDEN!
//             SUPPORTER WERDEN! SUPPORTER WERDEN! SUPPORTER WERDEN!
//           </Text>
//         </Inner>
//       </Root>
//     </Link>
//   )
// }

// const Root = styled.div`
//   overflow: hidden;
//   background-color: ${({ theme }) => theme.colors.black};
//   transition: background-color 0.6s;
//   padding: 10px 0;
//   &:hover {
//     background-color: ${({ theme }) => theme.colors.pink};
//   }
// `

// const Inner = styled.div`
//   white-space: nowrap;
// `
// const slide = keyframes`
//    from {
//     transform: translate3d(0, 0, 0);
//   }
//   to {
//     transform: translate3d(-100%, 0, 0);
//   }
// `

// const Text = styled.h2`
//   transition: font-size 0.5s, color 0.5s;
//   white-space: nowrap;
//   color: ${({ theme }) => theme.colors.pink};
//   margin: 0;
//   animation-name: ${slide};
//   animation-timing-function: linear;
//   animation-duration: 30s;
//   animation-iteration-count: infinite;

//   &:hover {
//     transition: font-size 0.5s, color 0.5s;
//     animation-play-state: paused;
//     color: ${({ theme }) => theme.colors.black};
//   }
// `

export {}
