import React from 'react'
// import CheckoutLink from "../../shopComponents/checkoutLink"
import Icon from '../../Icon'

const Icons: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <button
      className="pointer-events-auto z-90"
      aria-haspopup="true"
      aria-controls="main-menu"
      role="button"
      onClick={onClick}
    >
      <Icon icon="menu" />
    </button>
  )
}

export default Icons
