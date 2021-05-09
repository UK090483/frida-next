// import React from "react"

// import styled from "styled-components"
// import Header from "../../../generic/header/header"
// import Kreutz from "../../../../assets/Menu_Kreutz.svg"
// import PageTitle from "../../../generic/pageTitle/pageTitle"
// import { setMouse } from "../../../generic/Mouse/mouseRemote"

// import { Link } from "gatsby"

// export default function CheckOutContainer({ children, closeTo }) {
//   return (
//     <Root>
//       <Header title={false}>
//         <PageTitle
//           title={"fridaShop"}
//           color={"pink"}
//           checkInter={false}
//         ></PageTitle>

//         <Link
//           to={closeTo}
//           state={{
//             noScroll: true,
//           }}
//           style={{ width: 40, pointerEvents: "all" }}
//         >
//           <Kreutz
//             onMouseEnter={() => {
//               setMouse("link", true)
//             }}
//             onMouseLeave={() => {
//               setMouse("link", false)
//             }}
//           />
//         </Link>
//       </Header>

//       <Inner>{children}</Inner>
//     </Root>
//   )
// }

// const Inner = styled.div`
//   padding-top: 80px;
//   overflow: auto;
//   height: 100vh;

//   @media ${({ theme }) => theme.device.tablet} {
//     padding-top: 200px;
//   }
// `

// const Root = styled.div`
//   position: relative;
//   overflow-x: hidden;
//   width: 100vw;
//   min-height: 100vh;
//   background-color: ${({ theme }) => theme.colors.white};
//   z-index: 2000;
// `
