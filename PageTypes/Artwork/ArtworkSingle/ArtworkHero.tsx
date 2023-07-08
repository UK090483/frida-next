import BuyButton from '@components/ProductComponents/BuyButton'
import PaymentInfo from '@components/ProductComponents/PaymentInfo'
import ProductImageWrap from '@components/ProductComponents/ProductHeroImageWrap'
import ProductInfoWrap from '@components/ProductComponents/ProductHeroInfoWrap'
import ProductHeroWrap from '@components/ProductComponents/ProductHeroWrap'
import ProductHints from '@components/ProductComponents/productHints'
import ProductMagnifyImage from '@components/ProductComponents/ProductMagnifyImage'
import ProductName from '@components/ProductComponents/ProductName'
import Price from '@components/ProductComponents/ProductPrice'
import { useAddItem, useCartItems } from 'contexts/shopContext/useShopItem'
import React from 'react'
import { ArtworkSingleViewResult } from './Artwork.query'
import Video from '@components/Video/Video'

type ArtworkHeroProps = {
  artwork: ArtworkSingleViewResult
}

const ArtworkHero: React.FC<ArtworkHeroProps> = ({ artwork }) => {
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
    artistName,
    video,
    isNft,
    nftInfo,
    nftUrl,
    ethPrice,
  } = artwork

  console.log({ availability })

  const addItem = useAddItem()
  const cardItems = useCartItems()

  const itemInCart = !!cardItems.find((item) => item.id === shopify_variant_id)
  const alt = `artwork ${artworkName} by ${artistName}`

  const showVideo = isNft && video?.data?.status === 'ready'

  return (
    <ProductHeroWrap>
      <ProductImageWrap>
        {showVideo ? (
          <Video fit="contain" assetDocument={video} loop />
        ) : (
          <ProductMagnifyImage alt={alt} photo={photo} />
        )}
      </ProductImageWrap>
      <ProductInfoWrap>
        <div className="flex flex-col justify-center h-full mb-4">
          {artworkName && availability && (
            <ProductName
              size="l"
              name={artworkName}
              availability={availability !== 'sold'}
              asH1
              hiddenBefore={`Artwork: `}
              hiddenAfter={`by ${artistName}`}
            ></ProductName>
          )}

          {!isNft && (
            <div className="pb-2 text-xs-fluid">
              {`${medium}, ${width}*${height} ${
                depth ? '*' + depth : ''
              } cm ${stil}`}
            </div>
          )}
          {isNft && nftInfo && (
            <div className="pb-2 whitespace-pre-wrap text-xs-fluid">
              {nftInfo}
            </div>
          )}
          {price && (
            <Price
              price={isNft && ethPrice ? ethPrice : price}
              currency={isNft && ethPrice ? ' ETH' : undefined}
            />
          )}

          {/* <SocialShare className="pt-2 pb-6" /> */}
          {!isNft && (
            <BuyButton
              availability={availability !== 'sold'}
              className="my-10"
              isInCart={itemInCart}
              handleAddToCard={() => {
                if (!shopify_variant_id) {
                  console.error('shopify_variant_id missing')
                  return
                }
                addItem(shopify_variant_id, 1, undefined).then(() => null)
              }}
            />
          )}
          {isNft && (
            <BuyButton
              className="my-10"
              isInCart={itemInCart}
              nftLink={nftUrl || ' '}
              handleAddToCard={() => null}
            />
          )}

          {hints && <ProductHints items={hints} />}
          <PaymentInfo />
        </div>
      </ProductInfoWrap>
    </ProductHeroWrap>
  )
}

export default ArtworkHero
