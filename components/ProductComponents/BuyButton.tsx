import React from 'react'
import { useIntersection } from 'react-use'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import cx from 'classnames'

import { motion, Variants } from 'framer-motion'
import { useRouter } from 'next/router'
import { useSiteContext } from 'lib/context/context'
import useToggleCart from '@lib/context/useToggleCart'
import useCheckout from '@lib/context/useCheckout'

type BuyButtonProps = {
  handleAddToCard?: () => void
  shopify_variant_id?: string
  isInCart: boolean
  className?: string
  nftLink?: string
}

const BuyButton: React.FC<BuyButtonProps> = (props) => {
  const {
    handleAddToCard = () => null,
    isInCart,
    className = '',
    nftLink,
  } = props

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
  const byNFTText = locale === 'en' ? 'BUY NFT' : 'NFT KAUFEN'
  const isAddingText = locale === 'en' ? 'adding...' : 'wird hinzugefügt...'
  const availability = true

  const handleAdd = () => {
    handleAddToCard()
  }

  const checkOut = useCheckout()

  return (
    <div
      data-testid={'buyButton'}
      ref={intersectionRef}
      className={`h-12 ${className}`}
    >
      <div
        className={`flex w-[300px]  md:w-[480px] lg:w-vw/4 z-10  ${
          isOut && !isNavOpen
            ? 'fixed bottom-3 left-1/2 transform -translate-x-1/2  lg:translate-x-0 lg:translate-y-0.5 lg:left-unset lg:bottom-unset lg:top-frida_side_big lg:right-36'
            : ''
        }`}
      >
        {nftLink && (
          <a
            data-testid={'buyButton__nft'}
            className="rounded-full w-full text-center leading-none text-frida-white  py-3.5 px-12 text-sm-fluid font-bold overflow-hidden whitespace-nowrap bg-frida-green"
            href={nftLink}
            target="_blank"
            rel="noreferrer"
            {...mouseLinkProps}
          >
            {byNFTText}
          </a>
        )}

        {!nftLink && (
          <>
            <BButton
              testId={availability ? 'buyButton_putInCart' : 'buyButton_sold'}
              show={!isInCart}
              onClick={handleAdd}
              className={`${availability ? 'bg-frida-green' : 'bg-frida-red'}`}
            >
              {isAdding ? isAddingText : availability ? toCardText : soldText}
            </BButton>

            <BButton
              testId="buyButton_cart"
              onClick={openCart}
              show={isInCart}
              className="bg-frida-black"
            >
              {cartText}
            </BButton>
            <BButton
              testId="buyButton_checkout"
              onClick={() => {
                checkOut && (window.location.href = checkOut)
              }}
              show={isInCart}
              className="ml-5 bg-frida-green"
            >
              {checkoutText}
            </BButton>
          </>
        )}
      </div>
    </div>
  )
}

export default BuyButton

type BButtonProps = {
  onClick: () => void
  show: boolean
  className?: string
  testId?: string
}

const variants: Variants = {
  hidden: { opacity: 0, y: '100%', display: 'none', width: '50%' },
  visible: { opacity: 1, y: 0, display: 'block', width: '100%' },
}
const BButton: React.FC<BButtonProps> = ({
  children,
  onClick,
  show,
  className = '',
  testId,
}) => {
  return (
    <motion.button
      data-testid={testId}
      initial={'visible'}
      variants={variants}
      animate={show ? 'visible' : 'hidden'}
      onClick={onClick}
      {...mouseLinkProps}
      className={`rounded-full leading-none text-frida-white  py-3.5 text-sm-fluid font-bold overflow-hidden whitespace-nowrap ${cx(
        `${className}`
      )}`}
    >
      {children}
    </motion.button>
  )
}
