/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import Link from 'next/link'

// import { hasObject } from '@lib/helpers'

import Photo from '@components/Photo'
import ProductPrice from '@components/ProductComponents/ProductPrice'
import ProductCounter from '@components/ProductComponents/ProductCounter'

import Button from '@components/buttons/button'
import useToggleCart from '@lib/context/useToggleCart'
import { useRemoveItem, useUpdateItem } from '@lib/context/useShopItem'
import { FetchVariantResult } from '@lib/context/helper'
import { FridaLocation } from 'types'

type CartItemProps = {
  item: FetchVariantResult
  lang: FridaLocation
}
const CartItem: React.FC<CartItemProps> = ({ item, lang }) => {
  const { _type, product } = item
  const { subTitle } = product
  const removeItem = useRemoveItem()
  const updateItem = useUpdateItem()
  const toggleCart = useToggleCart()

  const changeQuantity = (quantity: number) => {
    updateItem(item.lineID, quantity)
  }

  const removeText = lang === 'en' ? 'remove' : 'entfernen'

  // const defaultPhoto = item.photos.cart?.find((set) => !set.forOption)
  // const variantPhoto = item.photos.cart?.find((set) => {
  //   const option = set.forOption
  //     ? {
  //         name: set.forOption.split(':')[0],
  //         value: set.forOption.split(':')[1],
  //       }
  //     : {}
  //   return option.value && hasObject(item.options, option)
  // })

  const defaultI = item.photos.default && item.photos.default[0]

  const photo = defaultI

  const isArtwork = _type === 'artwork'

  return (
    <div className="cart-item" data-testid={'cart__item'}>
      {photo && (
        <div className="relative cart-item--photo">
          <Photo
            photo={photo}
            srcSizes={[400]}
            sizes="(min-width: 768px) 400px, 35vw'"
            layout="contain"
          />
        </div>
      )}
      <div className="cart-item--details">
        <div className="cart-item--header">
          <div className="cart-item--title">
            <div className="cart-item--variant">
              {isArtwork ? subTitle : item.title}
            </div>
            <h2 className="cart-item--name">
              <Link
                href={`/${isArtwork ? 'artwork' : 'product'}/${
                  item.product.slug
                }?variant=${item.id}`}
                scroll={false}
              >
                <a
                  data-testid={'cart__item__title'}
                  onClick={() => toggleCart()}
                  className="cart-item--link"
                >
                  {item.product.title}
                </a>
              </Link>
            </h2>
          </div>
          <ProductPrice size="s" price={item.price} />
        </div>
        <div className="cart-item--tools">
          <div className="cart-item--quantity">
            {_type === 'productVariant' && (
              <ProductCounter
                key={item.id}
                id={item.id}
                defaultCount={item.quantity}
                onUpdate={changeQuantity}
                className="is-small is-inverted"
              />
            )}
          </div>

          <Button
            size="s"
            backgroundColor="grey"
            label={removeText}
            type="click"
            onClick={() => {
              removeItem(item.lineID)
            }}
            position="auto"
          />
        </div>
      </div>
    </div>
  )
}

export default CartItem
