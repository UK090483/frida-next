import React from 'react'
// import CheckoutLink from "../../shopComponents/checkoutLink"
import Icon from '../../Icon'

const Icons: React.FC<{ onClick: () => void; open: boolean }> = ({
  onClick,
  open,
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <button
      aria-label="open Menu"
      className="pointer-events-auto z-90"
      aria-haspopup="true"
      aria-controls="main-menu"
      aria-expanded={open}
      role="button"
      onClick={onClick}
    >
      <Icon icon="menu" />
    </button>
  )
}

export default Icons
