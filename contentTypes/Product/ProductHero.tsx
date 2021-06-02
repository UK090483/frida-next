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
import { useAddItem, useCartItems } from '@lib/context'
import ProductForm from 'blocks/product/product-form'
import React from 'react'
import { FridaLocation } from 'types'
import { ProductSingleViewResult } from './ProductSingle'

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
    //@ts-ignore
    const itemInCart = cardItems.find((item) => item.id === activeVariantId)

    if (itemInCart) {
      return setState((oS) => ({
        ...oS, //@ts-ignore
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
              {galleryPhotos.map((item) => {
                return item.photos.map((photo, index) => {
                  return (
                    <div
                      key={index}
                      className={'p-2'}
                      onClick={() => {
                        console.log(item.forOption)
                      }}
                    >
                      <Photo
                        photo={photo}
                        width={100}
                        height={100}
                        layout="contain"
                        className="w-20 h-20"
                      />
                    </div>
                  )
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
