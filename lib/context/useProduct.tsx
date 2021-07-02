import { ImageMetaResult } from '@lib/queries/snippets'
import { ProductVariant } from 'PageTypes/Product/ProductSingle'
import React from 'react'
import { useCartItems } from './useShopItem'

interface IUseProductProps {
  variants: ProductVariant[]
}

type IUseProductState = {
  activeVariantId: string
  quantity: number
  isInCart: boolean
  activePhoto: undefined | ImageMetaResult | null
}

function useProduct(props: IUseProductProps) {
  const { variants } = props
  const cardItems = useCartItems()

  const [{ activeVariantId, quantity, isInCart, activePhoto }, setState] =
    React.useState<IUseProductState>({
      activeVariantId: variants && variants[0] && variants[0].id,
      quantity: 1,
      isInCart: false,
      activePhoto: null,
    })

  const variantsById = variants.reduce(
    (acc, item) => ({ ...acc, [item.id]: item }),
    {} as { [k: string]: ProductVariant }
  )

  const activeVariant = variantsById[activeVariantId]

  React.useEffect(() => {
    const itemInCart = cardItems.find((item) => item.id == activeVariantId)
    if (itemInCart) {
      return setState((oS) => ({
        ...oS,
        quantity: itemInCart.quantity,
        isInCart: true,
      }))
    }

    return setState((oS) => ({
      ...oS,
      itemInCart: 1,
      isInCart: false,
      quantity: 1,
    }))
  }, [activeVariantId, cardItems])

  const setQuantity = (quantity: number) => {
    return setState((oS) => ({
      ...oS,
      quantity,
    }))
  }
  const setChange = (change: Partial<IUseProductState>) => {
    setState((oS) => ({ ...oS, ...change }))
  }

  return {
    activeVariantId,
    quantity,
    isInCart,
    activePhoto,
    variantsById,
    activeVariant,
    setQuantity,
    setChange,
    setState,
  }
}

export default useProduct
