import React from 'react'
import Link from 'next/link'

import Photo from '@components/Photo'
import ProductPrice from '@components/ProductComponents/ProductPrice'
import ProductCounter from '@components/ProductComponents/ProductCounter'

import Button from '@components/buttons/button'
import useToggleCart from 'contexts/shopContext/useToggleCart'
import { useRemoveItem, useUpdateItem } from 'contexts/shopContext/useShopItem'
import { FetchVariantResult } from 'contexts/shopContext/helper'

import { useRouter } from 'next/router'

type CartItemProps = {
  item: FetchVariantResult
}
const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { locale } = useRouter()

  const { _type, product } = item
  const { subTitle } = product
  const removeItem = useRemoveItem()
  const updateItem = useUpdateItem()
  const toggleCart = useToggleCart()

  const changeQuantity = (quantity: number) => {
    updateItem(item.lineID, quantity)
  }

  const removeText = locale === 'en' ? 'remove' : 'entfernen'

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
