import React from 'react'
// import CheckoutLink from "../../shopComponents/checkoutLink"
import Icon from '../../lib/Icon'

const Icons: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      className="pointer-events-auto"
      aria-haspopup="true"
      aria-controls="main-menu"
      role="button"
      onClick={onClick}
    >
      <Icon icon="menu" />
      <div className="absolute">{/* <CheckoutLink></CheckoutLink> */}</div>
    </button>
  )
}

export default Icons
