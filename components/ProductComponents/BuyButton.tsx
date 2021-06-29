import React from 'react'
import { useIntersection } from 'react-use'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import cx from 'classnames'
import { FridaColors } from 'types'
import { motion, Variants } from 'framer-motion'
import { useRouter } from 'next/router'
import { useSiteContext } from 'lib/context/context'
import useToggleCart from '@lib/context/useToggleCart'
import useCheckout from '@lib/context/useCheckout'

type BuyButtonProps = {
  handleAddToCard?: () => void

  isInCart?: boolean
}

const BuyButton: React.FC<BuyButtonProps> = (props) => {
  const { handleAddToCard = () => null, isInCart = false } = props
  //   const { availability, addToCart, inCart, checkoutUrl } = props

  const intersectionRef = React.useRef(null)

  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px 0px 100% 0px',
    threshold: 0,
  })

  const isOut = intersection
    ? intersection.boundingClientRect.y +
        intersection.boundingClientRect.height <
      0
    : false

  const { locale } = useRouter()
  const {
    meganav: { isOpen: isNavOpen },
  } = useSiteContext()

  const openCart = useToggleCart()

  const { isAdding } = useSiteContext()

  const toCardText = locale === 'en' ? 'add to cart' : 'In den Warenkorb'
  const soldText = locale === 'en' ? 'sold' : 'Leider Verkauft'
  const cartText = locale === 'en' ? 'cart' : 'Warenkorb'
  const checkoutText = locale === 'en' ? 'checkout' : 'Kasse'

  const isAddingText = locale === 'en' ? 'adding...' : 'wir hinzugefügt...'

  const availability = true

  const handleAdd = () => {
    handleAddToCard()
  }

  const checkOut = useCheckout()

  return (
    <div ref={intersectionRef} className=" h-12">
      <div
        className={`flex w-80 lg:w-vw/4 z-10 ${
          isOut && !isNavOpen
            ? 'fixed bottom-3 left-1/2 transform -translate-x-1/2 lg:translate-x-0 lg:left-unset lg:bottom-unset lg:top-3.5 lg:right-32'
            : ''
        }`}
      >
        <BButton
          show={!isInCart}
          onClick={handleAdd}
          color={availability ? 'green' : 'red'}
        >
          {isAdding ? isAddingText : availability ? toCardText : soldText}
        </BButton>

        <BButton onClick={openCart} show={isInCart} color="black">
          {cartText}
        </BButton>
        <BButton
          onClick={() => {
            checkOut && (window.location.href = checkOut)
          }}
          show={isInCart}
          color="green"
          className="ml-5"
        >
          {checkoutText}
        </BButton>
      </div>
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
      className={`rounded-full leading-none text-frida-white  py-3.5 text-sm-fluid font-bold overflow-hidden whitespace-nowrap ${cx(
        `bg-frida-${color}  ${className}`
      )}`}
    >
      {children}
    </motion.button>
  )
}
