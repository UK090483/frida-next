import BuyButton from '@components/ProductComponents/BuyButton'
import PaymentInfo from '@components/ProductComponents/PaymentInfo'
import ProductImageWrap from '@components/ProductComponents/ProductHeroImageWrap'
import ProductInfoWrap from '@components/ProductComponents/ProductHeroInfoWrap'
import ProductHeroWrap from '@components/ProductComponents/ProductHeroWrap'
import ProductHints from '@components/ProductComponents/productHints'
// import SocialShare from '../SocialShare/SocialShare'
import ProductMagnifyImage from '@components/ProductComponents/ProductMagnifyImage'
import ProductName from '@components/ProductComponents/ProductName'
import Price from '@components/ProductComponents/ProductPrice'
import { useAddItem, useCartItems } from '@lib/context'
import React from 'react'
import { FridaLocation } from 'types'
import { ArtworkSingleViewResult } from './artworksQueries'

type ArtworkHeroProps = {
  lang: FridaLocation
  artwork: ArtworkSingleViewResult
}

const ArtworkHero: React.FC<ArtworkHeroProps> = ({ artwork, lang }) => {
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
    hints,
  } = artwork

  const addItem = useAddItem()
  const cardItems = useCartItems()

  const itemInCart = !!cardItems.find((item) => item.id === shopify_variant_id)

  return (
    <ProductHeroWrap>
      <ProductImageWrap>
        <ProductMagnifyImage alt="alt" photo={photo} />
      </ProductImageWrap>
      <ProductInfoWrap>
        <div className="flex flex-col justify-center h-full mb-4">
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
        </div>
        {hints && <ProductHints items={hints} lang={lang} />}
        <PaymentInfo lang={lang} />
      </ProductInfoWrap>
    </ProductHeroWrap>
  )
}

export default ArtworkHero