import React, { useContext } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Artikel from "./Artikel/Artikel"
import Summary from "./Summary"
import shopContext from "~context/shopifyContext"
import Button from "../../../lib/buttons/button"

export default function ArtikelList() {
  const shop = useContext(shopContext)

  const {
    store: { checkout, client },
    removeLineItem,
  } = shop

  const handleRemove = e => {
    removeLineItem(client, checkout.id, e)
  }

  return (
    <Root>
      {checkout.lineItems.length > 0 ? (
        <React.Fragment>
          {checkout.lineItems.map(item => (
            <Artikel key={item.id} artikel={item} onRemove={handleRemove} />
          ))}
          <Summary sum={checkout.totalPrice} tax={checkout.totalTax}></Summary>
          <ButtonWrap>
            <CheckoutButton href={checkout.webUrl}>Kasse</CheckoutButton>
          </ButtonWrap>
        </React.Fragment>
      ) : (
        <div>
          <Text>Da ist leider noch nichts im Warenkorb...</Text>
          <ButtonsWrap>
            <Button label="zur OnlineGallery" type="link" link="/ausstellung" />
            <Button label="zum Shop" type="link" link="/shop" />
          </ButtonsWrap>
        </div>
      )}
    </Root>
  )
}

const Root = styled.ul`
  width: 100%;
  padding: 0;
  list-style: none;
  padding-bottom: 100px;
  padding-left: 20px;
  padding-right: 20px;

  li {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border-bottom: black solid 1px;
  }
  li:last-child {
    border-bottom: none;
  }
`

const ButtonWrap = styled.div`
  padding-top: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Text = styled.p`
  text-align: center;
`
const ButtonsWrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 150px;

  @media ${({ theme }) => theme.device.tablet} {
    width: 500px;
    justify-content: space-between;
  }
`
const CheckoutButton = styled.a`

  width:100%;
  max-width: 800px;
  font-weight: 800;
  text-decoration: none;
  cursor: none;
  pointer-events: all;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 1.5rem;
  border: ${({ theme }) => theme.colors.green + " solid " + theme.borderWidth};
  color: ${({ theme }) => theme.colors.white};
  background-color:${({ theme }) => theme.colors.green};
  border-radius: 50px;
   /* @media ${({ theme }) => theme.device.tablet} {
    padding: 1.2rem 2rem;
  } */
 
  
  
  transition: background-color 0.4s, color 0.4s;
  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.green};
  }  
`

ArtikelList.propTypes = {
  artikel: PropTypes.array,
}
