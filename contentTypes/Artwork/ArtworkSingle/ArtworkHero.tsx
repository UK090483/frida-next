import React from 'react'
// @ts-ignore
import useShopify from 'components/hooks/useShopify'
// @ts-ignore
// import { BuyButton, BuyButtonWrap } from '../lib/ProductComponents'
import PaymentInfo from '@components/ProductComponents/PaymentInfo'
import Price from '@components/ProductComponents/ProductPrice'
import ProductHeroWrap from '@components/ProductComponents/ProductHeroWrap'
import ProductImageWrap from '@components/ProductComponents/ProductHeroImageWrap'
import ProductInfoWrap from '@components/ProductComponents/ProductHeroInfoWrap'
import ProductName from '@components/ProductComponents/ProductName'
// import SocialShare from '../SocialShare/SocialShare'
import ProductMagnifyImage from '@components/ProductComponents/ProductMagnifyImage'
import { buildSrc } from '@lib/helpers'
import BuyButton from '@components/ProductComponents/BuyButton'
import { FridaLocation } from 'types'
import { ArtworkSingleViewResult } from './artworksQueries'
import { useAddItem, useCartItems } from '@lib/context'

type ArtworkHeroProps = {
  lang: FridaLocation
  artwork: ArtworkSingleViewResult
  shopifyProduct: any
}

const ArtworkHero: React.FC<ArtworkHeroProps> = ({
  artwork,
  shopifyProduct,
  lang,
}) => {
  const {
    artworkName,
    height,
    medium,
    stil,
    width,
    depth,
    price,
    availability,
    photo,
    shopify_variant_id,
  } = artwork

  const addItem = useAddItem()
  const cardItems = useCartItems()
  console.log(cardItems)
  const itemInCart = !!cardItems.find((item) => item.id === shopify_variant_id)

  return (
    <ProductHeroWrap>
      <ProductImageWrap>
        <ProductMagnifyImage alt="alt" photo={photo} />
      </ProductImageWrap>
      <ProductInfoWrap>
        <div className="flex flex-col justify-center h-full">
          {artworkName && availability && (
            <ProductName
              size="l"
              name={artworkName}
              availability={availability !== 'sold'}
            ></ProductName>
          )}
          <div className="text-xs-fluid font-bold pb-6">
            {`${medium}, ${width}*${height} ${
              depth ? '*' + depth : ''
            } cm ${stil}`}
          </div>
          {price && <Price price={price} />}
          <div className="pb-12">{/* <SocialShare /> */}</div>

          <BuyButton
            isInCart={itemInCart}
            handleAddToCard={() => {
              if (!shopify_variant_id) return
              addItem(shopify_variant_id, 1, undefined).then(() => {
                console.log('bla')
              })
            }}
          />
          {/* <BuyButtonWrap>
             <BuyButton
              checkoutUrl={checkoutUrl}
              availability={availability}
              addToCart={addToCart}
              inCart={inCart}
            /> 
          </BuyButtonWrap> */}
        </div>
        <PaymentInfo lang={lang} />
      </ProductInfoWrap>
    </ProductHeroWrap>
  )
}

export default ArtworkHero
