import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Frida from "../../frida/frida"
import Button from "../../buttons/button"
import styled, { keyframes } from "styled-components"
import Img from "gatsby-image"
import { useIntersection } from "react-use"
import { getFluidImage } from "~components/helper/sanityImage"
import Störer from "./stoerer"

export default function StartHero({ children }) {
  const data = useStaticQuery(graphql`
    query startHeroQuery {
      allFridaArtwork {
        nodes {
          image {
            imageAssetId
          }
        }
      }
    }
  `)

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  const allImages = data.allFridaArtwork.nodes
  const [images, setImages] = useState([])
  const intersectionRef = React.useRef(null)

  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  })

  useEffect(() => {
    function getNext() {
      let item = allImages[getRandomInt(0, allImages.length)]
      return getFluidImage(item.image.imageAssetId, { maxWidth: 50 })
    }
    if (intersection && intersection.isIntersecting) {
      const int = setTimeout(() => {
        const nextImages = [...images]
        if (nextImages.length > 10) {
          nextImages.shift()
        }

        const NextImage = {
          key: Date.now(),
          zIndex: getRandomInt(0, 2) > 0 ? 1 : 0,
          src: getNext(),
          left: `${getRandomInt(0, 100)}vw`,
        }

        nextImages.push(NextImage)

        setImages(nextImages)
      }, 800)
      return () => {
        clearTimeout(int)
      }
    }
  }, [allImages, images, setImages, intersection])

  return (
    <React.Fragment>
      <Root data-color={"pink"}>
        <Text>
          {children ? (
            children
          ) : (
            <React.Fragment>
              <h6>
                Neue Positionen kennenlernen, Kunst in ganz Deutschland sehen
                und dabei Kunstschaffende unterstützen.
              </h6>
              <h1>
                <Frida /> – Deutschlands größte Outdoor- und Online-Gallery für
                junge Kunst
              </h1>
              <Button
                label={"Mehr Erfahren"}
                link={"/ausstellung/"}
                backgroundColor={"lila"}
              />
            </React.Fragment>
          )}
        </Text>

        {images.map(image => {
          return (
            <Image
              style={{
                left: image.left,
                zIndex: image.zIndex,
                animationPlayState:
                  intersection && intersection.isIntersecting
                    ? "running"
                    : "paused",
              }}
              key={image.key}
              src={image.src.src}
            >
              <Img alt={"flying "} fluid={image.src}></Img>
            </Image>
          )
        })}
      </Root>
      <div ref={intersectionRef} />
      <Störer></Störer>
    </React.Fragment>
  )
}

const Root = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.pink};
`
const Text = styled.div`
  margin-top: 100px;
  z-index: 1;
  padding: 0 7%;
`

const drive = keyframes`
  0% {
    transform: translate3d(0, 100vh, 0);
  }
  5% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -100vh, 0);
  }
`

const Image = styled.div`
  position: absolute;
  width: 25vw;
  z-index: 0;
  animation-name: ${drive};
  animation-duration: 10s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  opacity: 0;
  @media ${({ theme }) => theme.device.tablet} {
    width: 9vw;
  }
`
