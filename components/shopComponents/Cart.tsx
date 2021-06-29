import React, { useState, useEffect } from 'react'
import FocusTrap from 'focus-trap-react'
import { m } from 'framer-motion'
import cx from 'classnames'

import { centsToPrice } from '@lib/helpers'
import CartItem from './CartItem'
import Button from '@components/buttons/button'

import { useSiteContext } from '@lib/context/context'
import { useRouter } from 'next/router'
import useToggleCart from '@lib/context/useToggleCart'
import useCheckout from '@lib/context/useCheckout'
import { useCartItems } from '@lib/context/useShopItem'
import { useCartTotals, useCartCount } from '@lib/context/useCart'

type CartProps = {
  data: any
}

const Cart: React.FC<CartProps> = ({ data }) => {
  // const { cart } = data

  const { isCartOpen, isUpdating } = useSiteContext()
  const { locale } = useRouter()

  const { subTotal } = useCartTotals()

  const cartCount = useCartCount()
  const lineItems = useCartItems()
  const checkoutURL = useCheckout()
  const toggleCart = useToggleCart()

  const [hasFocus, setHasFocus] = useState(false)
  const [checkoutLink, setCheckoutLink] = useState(checkoutURL)

  const yourCartText = locale === 'en' ? 'Your Cart' : 'Warenkorb'

  const handleKeyup = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      toggleCart()
    }
  }

  const goToCheckout = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleCart()

    setTimeout(() => {
      checkoutLink && window.open(checkoutLink, '_self')
    }, 200)
  }

  // update our checkout URL to use our custom domain name
  useEffect(() => {
    if (checkoutURL) {
      // const buildCheckoutLink = cart.storeURL
      //   ? checkoutURL.replace(
      //       /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/g,
      //       cart.storeURL
      //     )
      //   : checkoutURL
      setCheckoutLink(checkoutURL)
    }
  }, [checkoutURL])

  return (
    <>
      <FocusTrap
        active={isCartOpen && hasFocus}
        focusTrapOptions={{ allowOutsideClick: true }}
      >
        <m.div
          initial="hide"
          animate={isCartOpen ? 'show' : 'hide'}
          variants={{
            show: {
              x: '0%',
            },
            hide: {
              x: '100%',
            },
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onKeyUp={(e) => handleKeyup(e)}
          onAnimationComplete={() => setHasFocus(isCartOpen)}
          className={cx('cart is-inverted border-frida-grey', {
            'is-active': isCartOpen,
            'is-updating': isUpdating,
          })}
        >
          <div className="cart--inner ">
            <div className="cart--header">
              <div className="cart--title">
                {yourCartText} <span className="cart--count">{cartCount}</span>
              </div>

              <Button
                backgroundColor="pink"
                type="click"
                size="s"
                label="Done"
                onClick={() => toggleCart()}
                position="auto"
              />
            </div>

            <div className="cart--content">
              {lineItems?.length ? (
                <CartItems items={lineItems} />
              ) : (
                <EmptyCart />
              )}
            </div>

            {lineItems?.length > 0 && (
              <div className="cart--footer">
                <div className="cart--subtotal">
                  <span>Subtotal</span>
                  <span>${centsToPrice(subTotal)}</span>
                </div>

                <Button
                  size="s"
                  backgroundColor="pink"
                  type="externalLink"
                  label={isUpdating ? 'Updating...' : 'Checkout'}
                  link={checkoutLink ? checkoutLink : '/'}
                />

                {/* {cart.message && (
                  <p className="cart--message">{cart.message}</p>
                )} */}
              </div>
            )}
          </div>
        </m.div>
      </FocusTrap>

      <div
        className={cx('cart--backdrop', {
          'is-active': isCartOpen,
        })}
        onClick={() => toggleCart()}
      />
    </>
  )
}

const CartItems = ({ items }: { items: any }) => {
  return (
    <div className="cart--items">
      {items.map((item: any) => {
        return <CartItem key={item.id} item={item} />
      })}
    </div>
  )
}

const EmptyCart = () => (
  <div className="cart--empty">
    <p>Your cart is empty</p>
  </div>
)

export default Cart
