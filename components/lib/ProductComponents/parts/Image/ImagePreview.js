import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { getShopifyImage } from "../../../../fridaImage/shopifyImage"

function ImagePreview({ images, handleClick }) {
  const numItems = images.length

  const size = 100 / numItems

  return (
    <Root>
      <Inner>
        {images.map((image, index) => {
          return (
            <ImageWrap key={index} active={image.active}>
              <Image
                size={size}
                style={{
                  backgroundImage: `url(${getShopifyImage(
                    image.src,
                    "200x200"
                  )})`,
                }}
                // src={getShopifyImage(image.src, "200x200")}
                onClick={() => handleClick(image)}
              ></Image>
            </ImageWrap>
          )
        })}
      </Inner>
    </Root>
  )
}

const Inner = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Root = styled.div`
  overflow: hidden;
  width: 100%;
`

const Image = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: ${({ size }) => `calc(${size}vw - 15px)`};
  height: ${({ size }) => `calc(${size}vw - 15px)`};
  max-height: 100px;
  max-width: 100px;
  margin: 0;
  padding: 0;
`
const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  margin-right: 10px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.red};
  border-radius: 3px;
  border-width: ${({ active }) => (active ? "5px" : "0")};
  transition: border-width 0.3s;
`
ImagePreview.propTypes = {
  images: PropTypes.array,
  handleClick: PropTypes.func,
  currentIndex: PropTypes.number,
}

ImagePreview.defaultProps = {
  images: [],
  handleClick: () => {},
  currentIndex: 0,
}

export default ImagePreview
