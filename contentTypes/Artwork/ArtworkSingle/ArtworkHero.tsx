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

type ArtworkHeroProps = {
  lang: FridaLocation
  artwork: any
  shopifyProduct: any
}

const ArtworkHero: React.FC<ArtworkHeroProps> = ({
  artwork,
  shopifyProduct,
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
    lang,
  } = artwork

  return (
    <ProductHeroWrap>
      <ProductImageWrap>
        <ProductMagnifyImage alt="alt" photo={photo} />
      </ProductImageWrap>
      <ProductInfoWrap>
        <div className="flex flex-col justify-center h-full">
          <ProductName
            size="l"
            name={artworkName}
            availability={availability}
          ></ProductName>
          <div className="text-xs-fluid font-bold pb-6">
            {`${medium}, ${width}*${height} ${
              depth ? '*' + depth : ''
            } cm ${stil}`}
          </div>
          <Price price={price} />
          <div className="pb-12">{/* <SocialShare /> */}</div>

          <BuyButton />
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
