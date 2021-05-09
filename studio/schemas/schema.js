import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'
// Documents
import Artist from './documents/artist'
import Artwork from './documents/artwork'
import IndexPage from './documents/indexPage'
import Medium from './documents/medium'
import Page from './documents/page'
import Quotes from './documents/quotes'

import Stil from './documents/stil'
import SupporterLogos from './documents/supporter'
import Navigation from './documents/navigation'
import SettingsSeo from './documents/settings-seo'
import redirect from './documents/redirect'
import ShopifyCollection from './documents/shopify-collection'
import ShopifyProduct from './documents/shopify-product'
import ShopifyVariant from './documents/shopify-variant'

const documents = [
  ShopifyCollection,
  ShopifyProduct,
  ShopifyVariant,
  SettingsSeo,
  Artist,
  Artwork,
  IndexPage,
  Medium,
  Page,
  Quotes,
  Stil,
  SupporterLogos,
  Navigation,
  redirect
]
// ???

import Button from './objects/Button'
// Objects

import Seo from './objects/Seo'
import DefaultRichText from './pageComponents/defaultRichText'
import RichText from './objects/richtext'
import Spacer from './objects/Spacer'
import Supporter from './objects/Supporter'
import SupporterLogo from './objects/supporterLogo'
import PageHeader from './objects/PageHeader'
import CarouselHeroItem from './pageComponents/CarouselHero/CarouselHeroItem'
import CategoryItem from './pageComponents/category/CategoryItem'
import NavigationItem from './objects/NavigationItem'
import Figure from './objects/figure'

import productGalleryPhotos from './objects/product-gallery-photos'
import productListingPhotos from './objects/product-listing-photos'
import productCartPhotos from './objects/product-cart-photos'
import productOption from './objects/product-option'
import productOptionValue from './objects/product-option-value'
import productOptionSettings from './objects/product-option-settings'

import simplePortableText from './objects/portable-simple'

const objects = [
  Seo,
  PageHeader,
  DefaultRichText,
  RichText,
  Spacer,
  Supporter,
  SupporterLogo,
  CarouselHeroItem,
  CategoryItem,
  NavigationItem,
  Figure,

  productGalleryPhotos,
  productListingPhotos,
  productCartPhotos,
  productOption,
  productOptionValue,
  productOptionSettings,

  simplePortableText
]
// PageComponents
import Artworks from './pageComponents/Artworks'
import CarouselHero from './pageComponents/CarouselHero/CarouselHero'
import Categories from './pageComponents/category/Category'
import Hero from './pageComponents/Hero'
import Section from './pageComponents/Section'
import ArtworkCarousel from './pageComponents/ArtworkCarousel'
import Embed from './pageComponents/Embed'

const pageComponents = [
  CarouselHero,
  Categories,
  Section,
  Hero,
  Artworks,
  ArtworkCarousel,
  Embed
]

export default createSchema({
  name: 'default',

  types: schemaTypes.concat([
    ...documents,
    ...pageComponents,
    ...objects,

    Button
  ])
})
