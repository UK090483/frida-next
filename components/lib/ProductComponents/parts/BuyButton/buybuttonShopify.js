import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

import { setMouse } from "~components/generic/Mouse/mouseRemote"

export default function BuybuttonShopify(props) {
  const { availability, addToCart, inCart, checkoutUrl } = props

  const handleAdd = () => {
    addToCart()
  }

  return (
    <Root>
      {!inCart ? (
        <React.Fragment>
          {!availability ? (
            <BuyButton
              show={true}
              sold={true}
              onMouseEnter={() => {
                setMouse("link", true)
              }}
              onMouseLeave={() => {
                setMouse("link", false)
              }}
            >
              {"Leider Verkauft"}
            </BuyButton>
          ) : (
            <BuyButton
              show={true}
              onClick={() => {
                handleAdd()
              }}
              onMouseEnter={() => {
                setMouse("link", true)
              }}
              onMouseLeave={() => {
                setMouse("link", false)
              }}
            >
              {"In den Warenkorb"}
            </BuyButton>
          )}
        </React.Fragment>
      ) : (
        <WarenKorbButton
          key="erase"
          show={true}
          onMouseEnter={() => {
            setMouse("link", true)
          }}
          onMouseLeave={() => {
            setMouse("link", false)
          }}
          onClick={() => {
            navigate("/checkout")
          }}
        >
          Warenkorb
        </WarenKorbButton>
      )}

      <BuyButton
        key="show"
        show={inCart}
        margin
        onMouseEnter={() => {
          setMouse("link", true)
        }}
        onMouseLeave={() => {
          setMouse("link", false)
        }}
        onClick={() => {
          window.location = checkoutUrl
        }}
      >
        {"Kasse"}
      </BuyButton>
    </Root>
  )
}

BuybuttonShopify.defaultProps = {
  availability: false,
  addToCart: () => {
    "addToCart functionProp ist needed in Buybutton"
  },
  inCart: false,
  checkoutUrl: "/",
}

const Root = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.device.tablet} {
    flex-wrap: nowrap;
  }
`

const BuyButton = styled.div`
  overflow: hidden;
  outline: none;
  background-color: ${({ theme }) => theme.colors.green};
  opacity: ${({ sold }) => (sold ? "0.8" : "1")};
  min-height: 45px;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font-size: 1.4em;
  font-weight: 900;
  text-decoration: none;
  border: ${({ theme }) => theme.colors.green} solid 3px;
  transform-origin: right;
  width: ${({ show }) => (show ? "100%" : "0")};
  overflow: hidden;
  white-space: nowrap;
  border-width: ${({ show }) => (show ? "3px" : "0")};
  padding: ${({ show }) => (show ? "0px 0px" : "0")};
  margin-top: 10px;

  @media ${({ theme }) => theme.device.tablet} {
    margin-left: ${({ margin, show }) => (margin && show ? "20px" : "0")};
    margin-top: 0;
    min-height: 70px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    background-color: transparent;
    color: ${({ theme }) => theme.colors.green};
  }
  transition: width 0.3s cubic-bezier(0.47, 0.71, 0.42, 1.12),
    background-color 0.3s, color 0.3s, border 0.3s;
`
const WarenKorbButton = styled(BuyButton)`
  border: ${({ theme }) => theme.colors.black} solid 3px;
  color: ${({ theme }) => theme.colors.black};
  background-color: transparent;

  &:hover {
    color: ${({ theme }) => theme.colors.green};
    border: ${({ theme }) => theme.colors.green} solid 3px;
  }
`
