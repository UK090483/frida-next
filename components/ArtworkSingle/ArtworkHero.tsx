import React from 'react'
// @ts-ignore
import useShopify from '../hooks/useShopify'
// @ts-ignore
// import { BuyButton, BuyButtonWrap } from '../lib/ProductComponents'
import PaymentInfo from '../lib/ProductComponents/PaymentInfo'
import Price from '../lib/ProductComponents/ProductPrice'
import ProductHeroWrap from '../lib/ProductComponents/ProductHeroWrap'
import ProductImageWrap from '../lib/ProductComponents/ProductHeroImageWrap'
import ProductInfoWrap from '../lib/ProductComponents/ProductHeroInfoWrap'
import ProductName from '../lib/ProductComponents/ProductName'
// import SocialShare from '../SocialShare/SocialShare'
import ProductMagnifyImage from '../lib/ProductComponents/ProductMagnifyImage'
import { buildSrc } from '@lib/helpers'
import BuyButton from '@components/lib/ProductComponents/BuyButton'

type ArtworkHeroProps = {
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
        <PaymentInfo />
      </ProductInfoWrap>
    </ProductHeroWrap>
  )
}

export default ArtworkHero
