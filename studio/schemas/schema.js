import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'
// Documents
import Artist from './documents/artist'
import Artwork from './documents/artwork'
import IndexPage from './documents/indexPage'
import Medium from './documents/medium'
import Page from './documents/page'
import Quote from './documents/quotes'
import footer from './documents/footer'

import Stil from './documents/stil'
import SupporterLogos from './documents/supporter'
import Navigation from './documents/navigation'
import SettingsSeo from './documents/settings-seo'
import redirect from './documents/redirect'
import ShopifyCollection from './documents/shopify-collection'
import ShopifyProduct from './documents/shopify-product'
import ShopifyVariant from './documents/shopify-variant'

import Post from './documents/post'
import PostCategory from './documents/postCategory'

const documents = [
  footer,
  Post,
  PostCategory,
  ShopifyCollection,
  ShopifyProduct,
  ShopifyVariant,
  SettingsSeo,
  Artist,
  Artwork,
  IndexPage,
  Medium,
  Page,
  Quote,
  Stil,
  SupporterLogos,
  Navigation,
  redirect
]
// ???

// Objects

import Seo from './objects/Seo'
import defaultRichText from './pageComponents/defaultRichText'
import innerRichText from './pageComponents/innerRichText'

import Spacer from './objects/Spacer'
import Supporter from './objects/Supporter'
import SupporterLogo from './objects/supporterLogo'
import PageHeader from './objects/PageHeader'
import CarouselHeroItem from './pageComponents/CarouselHero/CarouselHeroItem'
import CategoryItem from './pageComponents/category/CategoryItem'
import NavigationItem from './objects/NavigationItem'
import Figure from './objects/figure'
import DefaultImage from './objects/defaultImage'

import productGalleryPhotos from './objects/product-gallery-photos'
import productListingPhotos from './objects/product-listing-photos'
import productCartPhotos from './objects/product-cart-photos'
import productOption from './objects/product-option'
import productOptionValue from './objects/product-option-value'
import productOptionSettings from './objects/product-option-settings'

import simplePortableText from './objects/portable-simple'

// Plugs

import Button from './pageComponents/plugs/Button'
import image from './pageComponents/plugs/Image'
import SeoHeader from './pageComponents/plugs/SeoHeader'
import Embed from './pageComponents/plugs/Embed'
import imageGallery from './pageComponents/plugs/ImageGallery'
import innerSection from './pageComponents/plugs/innerSection'
import innerSectionItem from './pageComponents/plugs/innerSectionItem'

const objects = [
  Seo,
  PageHeader,
  defaultRichText,
  innerRichText,

  Spacer,
  Supporter,
  SupporterLogo,
  CarouselHeroItem,
  CategoryItem,
  NavigationItem,
  Figure,
  DefaultImage,

  productGalleryPhotos,
  productListingPhotos,
  productCartPhotos,
  productOption,
  productOptionValue,
  productOptionSettings,
  image,
  simplePortableText,
  innerSection,
  innerSectionItem
]
// PageComponents
import Section from './pageComponents/Section'
import Artworks from './pageComponents/Artworks'
import CarouselHero from './pageComponents/CarouselHero/CarouselHero'
import Categories from './pageComponents/category/Category'
import ArtworkCarousel from './pageComponents/ArtworkCarousel'

import Artists from './pageComponents/Artists'
import Posts from './pageComponents/Posts'
import Products from './pageComponents/Products'
import marquee from './pageComponents/marquee'
import Quotes from './pageComponents/Quotes'

const pageComponents = [
  imageGallery,
  Quotes,
  SeoHeader,
  marquee,
  Section,
  Posts,
  CarouselHero,
  Categories,
  Artworks,
  ArtworkCarousel,
  Embed,
  Artists,
  Products
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
