import Photo from '@components/photo'
import BuyButton from '@components/ProductComponents/BuyButton'
import PaymentInfo from '@components/ProductComponents/PaymentInfo'
import ProductCounter from '@components/ProductComponents/ProductCounter'
import ProductImageWrap from '@components/ProductComponents/ProductHeroImageWrap'
import ProductInfoWrap from '@components/ProductComponents/ProductHeroInfoWrap'
import ProductHeroWrap from '@components/ProductComponents/ProductHeroWrap'
import ProductMagnifyImage from '@components/ProductComponents/ProductMagnifyImage'
import ProductName from '@components/ProductComponents/ProductName'
import Price from '@components/ProductComponents/ProductPrice'
import { useAddItem, useCartItems } from '@lib/context/useShopItem'
import ProductForm from '@components/ProductComponents/product-form'
import React from 'react'
import { FridaLocation } from 'types'
import { ProductSingleViewResult } from './ProductSingle'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'

interface ProductHeroProps extends ProductSingleViewResult {
  lang: FridaLocation
}

const ProductHero: React.FC<ProductHeroProps> = (props) => {
  const {
    price,
    title,
    inStock,
    galleryPhotos,
    listingPhotos,
    lang,
    variants,
  } = props

  const hasGallery = galleryPhotos && galleryPhotos.length > 0

  const variantsById = variants.reduce(
    (acc, item) => ({ ...acc, [item.id]: item }),
    {} as { [k: string]: any }
  )
  // const photosByVariantsId = variants.reduce((acc, item) => {
  //   const o = item.options.map((i) => `${i.name}:${i.value}`)
  //   const res = galleryPhotos?.filter((i) => {
  //     return o.includes(i.forOption)
  //   })
  //   return { ...acc, [item.id]: res }
  // }, {} as { [k: string]: any })

  const photosIncVariantsId = variants.reduce((acc, item) => {
    const o = item.options.map((i) => `${i.name}:${i.value}`)
    const res = galleryPhotos?.filter((i) => {
      return o.includes(i.forOption)
    })
    return { ...acc, [item.id]: res }
  }, {} as { [k: string]: any })

  const [{ activeVariantId, quantity, isInCart }, setState] = React.useState({
    activeVariantId: variants && variants[0] && variants[0].id,
    quantity: 1,
    isInCart: false,
  })

  const activeVariant = variantsById[activeVariantId]
  const photo = listingPhotos[0] ? listingPhotos[0].listingPhoto : null

  const addItem = useAddItem()
  const cardItems = useCartItems()

  React.useEffect(() => {
    const itemInCart = cardItems.find((item) => item.id === activeVariantId)

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

  return (
    <ProductHeroWrap>
      <ProductImageWrap>
        <div className="flex flex-col max-h-full w-full">
          <div style={{ height: hasGallery ? 'calc(100% - 6rem)' : '100%' }}>
            <ProductMagnifyImage alt="alt" photo={photo} />
          </div>
          {galleryPhotos && (
            <div className="flex h-24 flex-shrink-0 ">
              {Object.entries(photosIncVariantsId).map(([id, item]) => {
                //@ts-ignore
                return item.map((image) => {
                  //@ts-ignore
                  return image.photos.map((photo, index) => {
                    return (
                      <button
                        {...mouseLinkProps}
                        key={index}
                        className={'relative m-2 w-20 h-20'}
                        onClick={() => {
                          setState((oS) => ({ ...oS, activeVariantId: id }))
                        }}
                      >
                        <Photo photo={photo} layout="fill" />
                      </button>
                    )
                  })
                })
              })}
            </div>
          )}
        </div>
      </ProductImageWrap>
      <ProductInfoWrap>
        <div className="flex flex-col justify-center h-full">
          <ProductName
            size="l"
            name={title || 'title missing'}
            availability={inStock}
          ></ProductName>

          <ProductForm
            product={props}
            activeVariant={activeVariant}
            onVariantChange={(variantId: string) => {
              setState((oS) => ({ ...oS, activeVariantId: variantId }))
            }}
          />

          <ProductCounter
            defaultCount={quantity}
            onUpdate={(count) => {
              setQuantity(count)
            }}
          />
          <Price price={activeVariant ? activeVariant.price : price} />
          <div className="pb-12">{/* <SocialShare /> */}</div>

          <BuyButton
            isInCart={isInCart}
            handleAddToCard={() => {
              addItem(activeVariantId, quantity, undefined).then(() => {
                console.log('bla')
              })
            }}
          />
        </div>
        <PaymentInfo lang={lang} />
      </ProductInfoWrap>
    </ProductHeroWrap>
  )
}

export default ProductHero

export {}
