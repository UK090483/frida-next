import React from "react"
import styled from "styled-components"
import EraseIcon from "../../../../../assets/erase.svg"
import { getShopifyImage } from "../../../../fridaImage/shopifyImage"

export default function Artikel({ artikel, onRemove }) {
  const { title, variant } = artikel

  if (!variant)
    return (
      <Root>
        <div>Dieser Artikel wurde vor kurzem entfernt</div>
      </Root>
    )

  const { price, image } = variant

  return (
    <Root>
      <Image
        style={{
          backgroundImage: `url(${getShopifyImage(image.src, "200x200")})`,
        }}
      />

      <InfoRoot>
        <Title>{title}</Title>
        <Price>{price}€</Price>
      </InfoRoot>
      <StyledEraseIcon
        onClick={() => {
          onRemove(artikel.id)
        }}
      ></StyledEraseIcon>
    </Root>
  )
}

const StyledEraseIcon = styled(EraseIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  max-width: 30px;
  path {
    fill: ${({ theme }) => theme.colors.red};
  }
`

const Root = styled.li`
  position: relative;
  width: 100%;

  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
  }
`
const Image = styled.div`
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`
const Title = styled.h6`
  font-size: 20px;
  width: 100%;
`
const Price = styled.h6`
  font-size: 20px;
  align-self: flex-end;
  margin: 0;
  margin-left: auto;
  width: 100%;
  text-align: right;
  @media ${({ theme }) => theme.device.tablet} {
  }
`
const InfoRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  @media ${({ theme }) => theme.device.tablet} {
    flex-wrap: nowrap;
    padding-left: 10px;
  }
`
