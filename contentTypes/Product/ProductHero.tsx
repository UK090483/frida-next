import React from 'react'
import PaymentInfo from 'components/lib/ProductComponents/PaymentInfo'
import Price from 'components/lib/ProductComponents/ProductPrice'
import ProductHeroWrap from 'components/lib/ProductComponents/ProductHeroWrap'
import ProductImageWrap from 'components/lib/ProductComponents/ProductHeroImageWrap'
import ProductInfoWrap from 'components/lib/ProductComponents/ProductHeroInfoWrap'
import ProductName from 'components/lib/ProductComponents/ProductName'
// import SocialShare from '../SocialShare/SocialShare'
import ProductMagnifyImage from 'components/lib/ProductComponents/ProductMagnifyImage'
import { buildSrc } from '@lib/helpers'
import BuyButton from '@components/lib/ProductComponents/BuyButton'
import { ProductSingleViewResult } from '@lib/queries/productQueries'
import { FridaLocation } from 'types'

interface ProductHeroProps extends ProductSingleViewResult {
  lang: FridaLocation
}

const ProductHero: React.FC<ProductHeroProps> = (props) => {
  const { price, title, inStock, galleryPhotos, listingPhotos, lang } = props

  const photo = listingPhotos[0] ? listingPhotos[0].listingPhoto : null

  return (
    <ProductHeroWrap>
      <ProductImageWrap>
        <ProductMagnifyImage alt="alt" photo={photo} />
      </ProductImageWrap>
      <ProductInfoWrap>
        <div className="flex flex-col justify-center h-full">
          <ProductName
            size="l"
            name={title || 'title missing'}
            availability={inStock}
          ></ProductName>

          <Price price={price} />
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
