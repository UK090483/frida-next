import BuyButton from '@components/ProductComponents/BuyButton'
import PaymentInfo from '@components/ProductComponents/PaymentInfo'
import ProductImageWrap from '@components/ProductComponents/ProductHeroImageWrap'
import ProductInfoWrap from '@components/ProductComponents/ProductHeroInfoWrap'
import ProductHeroWrap from '@components/ProductComponents/ProductHeroWrap'
// import SocialShare from '../SocialShare/SocialShare'
import ProductMagnifyImage from '@components/ProductComponents/ProductMagnifyImage'
import ProductName from '@components/ProductComponents/ProductName'
import Price from '@components/ProductComponents/ProductPrice'
import React from 'react'
import { FridaLocation } from 'types'
import { ProductSingleViewResult } from './ProductSingle'

import ProductForm from 'blocks/product/product-form'
import Photo from '@components/photo'

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
  const galleryById = galleryPhotos
    ? galleryPhotos.reduce((acc, item) => {
        return { ...acc }
      }, {} as { [k: string]: any })
    : {}

  const [{ activeVariantId }, setState] = React.useState({
    activeVariantId: variants && variants[0] && variants[0].id,
  })

  const activeVariant = variantsById[activeVariantId]
  const photo = listingPhotos[0] ? listingPhotos[0].listingPhoto : null

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
                return item.photos.map((photo) => {
                  return (
                    <div
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
          <Price price={activeVariant ? activeVariant.price : price} />
          <div className="pb-12">{/* <SocialShare /> */}</div>

          <BuyButton />
        </div>
        <PaymentInfo lang={lang} />
      </ProductInfoWrap>
    </ProductHeroWrap>
  )
}

export default ProductHero

export {}
