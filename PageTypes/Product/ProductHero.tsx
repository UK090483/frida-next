import BuyButton from '@components/ProductComponents/BuyButton'
import PaymentInfo from '@components/ProductComponents/PaymentInfo'
import ProductCounter from '@components/ProductComponents/ProductCounter'
import ProductImageWrap from '@components/ProductComponents/ProductHeroImageWrap'
import ProductInfoWrap from '@components/ProductComponents/ProductHeroInfoWrap'
import ProductHeroWrap from '@components/ProductComponents/ProductHeroWrap'
import ProductMagnifyImage from '@components/ProductComponents/ProductMagnifyImage'
import ProductImageGallery from '@components/ProductComponents/ProductImageGallerie'
import ProductName from '@components/ProductComponents/ProductName'
import Price from '@components/ProductComponents/ProductPrice'
import { useAddItem } from 'contexts/shopContext/useShopItem'
import ProductForm from '@components/ProductComponents/product-form'
import React from 'react'
import { ProductSingleViewResult } from './ProductSingle.query'
import useProduct from 'contexts/shopContext/useProduct'

type ProductHeroProps = ProductSingleViewResult

const ProductHero: React.FC<ProductHeroProps> = (props) => {
  const {
    price,
    title,
    inStock,
    galleryPhotos,
    listingPhotos,

    variants,
  } = props

  const hasGallery = galleryPhotos && galleryPhotos.length > 0

  const {
    activeVariant,
    quantity,
    setQuantity,
    activeVariantId,
    isInCart,
    activePhoto,
    setChange,
  } = useProduct({ variants })

  const photo =
    listingPhotos && listingPhotos[0] ? listingPhotos[0].listingPhoto : null
  const addItem = useAddItem()

  return (
    <ProductHeroWrap>
      <ProductImageWrap>
        <div className="flex flex-col w-full max-h-full">
          <div style={{ height: hasGallery ? 'calc(100% - 6rem)' : '100%' }}>
            <ProductMagnifyImage alt="alt" photo={activePhoto || photo} />
          </div>
          {galleryPhotos && (
            <ProductImageGallery
              product={props}
              activePhoto={activePhoto}
              onChange={(variantId, photo) => {
                setChange({ activeVariantId: variantId, activePhoto: photo })
              }}
            />
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
          <Price price={activeVariant ? activeVariant.price : price} />

          <BuyButton
            className="my-10"
            isInCart={isInCart}
            handleAddToCard={() => {
              addItem(activeVariantId, quantity, undefined).then(() => {
                console.log('bla')
              })
            }}
          />
          <ProductForm
            product={props}
            activeVariant={activeVariant}
            onVariantChange={(variantId: string) => {
              setChange({ activeVariantId: variantId })
            }}
          />
          <div className="pb-5"></div>
          <ProductCounter
            defaultCount={quantity}
            onUpdate={(count) => {
              setQuantity(count)
            }}
          />
          <div className="pb-10"></div>

          <PaymentInfo />
        </div>
      </ProductInfoWrap>
    </ProductHeroWrap>
  )
}
export default ProductHero
