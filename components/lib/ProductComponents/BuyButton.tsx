import React from 'react'

import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import cx from 'classnames'
import { FridaColors } from 'types'
import { motion, Variant, Variants } from 'framer-motion'
const BuyButton = () => {
  //   const { availability, addToCart, inCart, checkoutUrl } = props

  const [inCard, setstate] = React.useState(false)

  const availability = true

  const handleAdd = () => {
    setstate(!inCard)
    if (availability) {
      console.log('add')
    }
  }

  return (
    <div className="w-full flex ">
      <BButton
        show={!inCard}
        onClick={handleAdd}
        color={availability ? 'green' : 'red'}
      >
        {availability ? 'In den Warenkorb' : 'Leider Verkauft'}
      </BButton>

      <BButton onClick={handleAdd} show={inCard} color="black">
        {'Warenkorb'}
      </BButton>
      <BButton onClick={handleAdd} show={inCard} color="green" className="ml-5">
        {'Kasse'}
      </BButton>
    </div>
  )
}

export default BuyButton

type BButtonProps = {
  color: FridaColors
  onClick: () => void
  show: boolean
  className?: string
}

const variants: Variants = {
  hidden: { opacity: 0, y: '100%', display: 'none', width: '50%' },
  visible: { opacity: 1, y: 0, width: '100%' },
}
const BButton: React.FC<BButtonProps> = ({
  color,
  children,
  onClick,
  show,
  className = '',
}) => {
  return (
    <motion.button
      initial={'visible'}
      variants={variants}
      animate={show ? 'visible' : 'hidden'}
      onClick={onClick}
      {...mouseLinkProps}
      className={`rounded-full text-frida-white px-12 py-6 text-sm-fluid font-bold overflow-hidden whitespace-nowrap ${cx(
        `bg-frida-${color}  ${className}`
      )}`}
    >
      {children}
    </motion.button>
  )
}
