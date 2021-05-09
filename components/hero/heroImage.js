import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"
import styled from "styled-components"

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { eq: "team-image.jpg" } }) {
        edges {
          node {
            id
            childImageSharp {
              resize(width: 1200, jpegQuality: 100) {
                src
              }
              fluid(maxWidth: 1200, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Root
    // className={style.root}
    // style={{
    //   backgroundImage: `url(${data.allFile.edges[0].node.childImageSharp.resize.src})`,
    // }}
    >
      <Text>
        <h6>KONTAKT</h6>
        <h1>
          {/* Wer hinter <br /> <Frida></Frida> steckt */}
          Schwäne <br /> für die Kunst
        </h1>
      </Text>
      <Fimage>
        <Img fluid={data.allFile.edges[0].node.childImageSharp.fluid} />
      </Fimage>
    </Root>
  )
}
const Root = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: right;
  margin-left: 7%;
`
const Text = styled.div`
  z-index: 2;
`
const Fimage = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  width: 90vw;
  opacity: 0.7;
  @media ${({ theme }) => theme.device.tablet} {
    width: 80vw;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    width: 60vw;
  }
`

export default Image
