import React from "react"
import styled from "styled-components"
function Quantity({ quantity, setQuantity, quantityAvailable }) {
  const handleChange = e => {
    if (e === "add") {
      if (quantity < quantityAvailable) {
        setQuantity(quantity + 1)
      }
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1)
      }
    }
  }

  return (
    <React.Fragment>
      {quantityAvailable > 1 && (
        <Root>
          <Input>{quantity}</Input>
          <ButtonWrap isMax={quantity === quantityAvailable}>
            <div
              onClick={() => {
                handleChange("add")
              }}
            >
              +
            </div>
            <div
              onClick={() => {
                handleChange("subtract")
              }}
            >
              -
            </div>
          </ButtonWrap>
        </Root>
      )}
    </React.Fragment>
  )
}

const Root = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
`
const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 48px;
  border: ${({ theme }) => theme.colors.green} solid 3px;
  border-right-width: 0;
  border-radius: 5px 0 0 5px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.green};
  /* padding: 0 0 0 10px; */
  font-weight: 700;
`

const ButtonWrap = styled.div`
  div {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.green};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 24px;
    border: ${({ theme }) => theme.colors.green} solid 3px;
    border-radius: 0 0 5px 0;
    &:first-child {
      color: ${({ theme, isMax }) =>
        isMax ? theme.colors.red : theme.colors.green};
      border-radius: 0 5px 0 0;
      border-bottom-width: 0;
    }
  }
`

Quantity.defaultProps = {
  quantityAvailable: 1,
  quantity: 1,
  setQuantity: e => {
    console.error("Component Qauntity needs a setQuantity functionProp")
  },
}

export default Quantity
