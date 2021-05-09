// import React, { useState, useEffect } from "react"
// import Button from "../lib/buttons/button"
// import { useStaticQuery, graphql } from "gatsby"
// import { useCookies } from "react-cookie"
// import Kreutz from "../../assets/Menu_Kreutz.svg"
// import styled from "styled-components"

// import { setMouse } from "../generic/Mouse/mouseRemote"

// const gdprCookie = "gatsby-plugin-google-analytics-gdpr_cookies-enabled"

// export default function CookieConsent() {
//   const [clicked, setClicked] = useState(true)
//   const [cookies, setCookie] = useCookies()

//   useEffect(() => {
//     if (cookies[gdprCookie] && cookies[gdprCookie] === "false") {
//       setClicked(false)
//     }
//   }, [cookies])

//   const data = useStaticQuery<GatsbyTypes.CookieQueryQuery>(graphql`
//     query CookieQuery {
//       file(relativePath: { eq: "Cookie.png" }) {
//         childImageSharp {
//           fluid(maxWidth: 100) {
//             src
//           }
//         }
//       }
//     }
//   `)
//   const image = data.file.childImageSharp.fluid.src

//   const handleClick = set => {
//     setClicked(true)
//     if (set) {
//       var oneYearFromNow = new Date()
//       oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
//       setCookie(gdprCookie, "true", { expires: oneYearFromNow })
//     }
//   }

//   return (
//     <Root clicked={clicked}>
//       <Text>
//         <img src={image} alt="cookie" />
//         <p>
//           Wir nutzen Cookies um Ihr Erlebnis auf unserer Website angenehm zu
//           gestalten und steig zu verbessen!
//         </p>
//       </Text>
//       <Buttons>
//         <Button
//           type="click"
//           color="pink"
//           backgroundColor="white"
//           label={"Einverstanden"}
//           onClick={() => {
//             handleClick(true)
//           }}
//         />

//         <Kreutz
//           onClick={() => {
//             handleClick(false)
//           }}
//           onMouseEnter={() => {
//             setMouse("link", true)
//           }}
//           onMouseLeave={() => {
//             setMouse("link", false)
//           }}
//         ></Kreutz>
//       </Buttons>
//     </Root>
//   )
// }

// const Root = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   width: 100vw;
//   background-color: ${({ theme }) => theme.colors.white};
//   position: fixed;
//   bottom: ${({ clicked }) => (clicked ? "-100%" : "0")};
//   z-index: 9000;
//   padding: 10px 20px;
//   transition: bottom 1s;
//   @media ${({ theme }) => theme.device.tablet} {
//     flex-wrap: nowrap;
//   }
//   img {
//     margin: 0;
//   }
// `
// const Text = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   padding-right: 20px;

//   p {
//     font-size: 0.8rem;
//     margin: 0;
//     padding: 0;
//   }

//   @media ${({ theme }) => theme.device.tablet} {
//     p {
//       font-size: 1rem;
//     }
//   }
// `
// const Buttons = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   flex-grow: 2;

//   svg {
//     width: 40px;
//     height: 40px;
//   }
//   @media ${({ theme }) => theme.device.tablet} {
//     min-width: 340px;
//   }
// `
export {}
