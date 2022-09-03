import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'
// Documents
import Artist from './documents/artist'

import Artwork from './documents/artwork'
import Medium from './documents/medium'
import Stil from './documents/stil'

import Page from './documents/page'
import IndexPage from './documents/indexPage'
import Post from './documents/post'
import PostCategory from './documents/postCategory'

import Quote from './documents/quotes'

import Footer from './documents/footer'
import Navigation from './documents/navigation'

import SettingsSeo from './documents/settings-seo'
import redirect from './documents/redirect'





import ShopifyCollection from './documents/shopify-collection'
import ShopifyProduct from './documents/shopify-product'
import ShopifyVariant from './documents/shopify-variant'

// import Product from './documents/product'
// import ProductVariant from './documents/productVariant'

import ProxyString from './objects/proxyString'

const documents = [
  Footer,
  Post,
  PostCategory,
  ShopifyCollection,
  // Product,
  // ProductVariant,
  // ProxyString,
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
  Navigation,
  redirect
]


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
import productHint from './objects/productHint'
import file from './objects/file'
import link from './objects/link'

const objects = [
  link,
  Seo,
  PageHeader,
  defaultRichText,
  innerRichText,
  file,
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
  productHint,
  
  simplePortableText,
  innerSection,
  innerSectionItem
]
// PageComponents
import Section from './pageComponents/Section'
import CarouselHero from './pageComponents/CarouselHero/CarouselHero'
import Categories from './pageComponents/category/Category'

import Artworks from './pageComponents/Artworks'
import Artists from './pageComponents/Artists'
import Posts from './pageComponents/Posts'
import Products from './pageComponents/Products'

import marquee from './pageComponents/marquee'
import Quotes from './pageComponents/Quotes'

// Plugs
import Button from './pageComponents/plugs/Button'
import image from './pageComponents/plugs/Image'
import SeoHeader from './pageComponents/plugs/SeoHeader'
import Embed from './pageComponents/plugs/Embed'
import imageGallery from './pageComponents/plugs/ImageGallery'
import innerSection from './pageComponents/plugs/innerSection'
import innerSectionItem from './pageComponents/plugs/innerSectionItem'
import Download from './pageComponents/plugs/DownLoad'


const pageComponents = [

  Section,
  CarouselHero,
  Categories,
  Artworks,
  Artists,
  Posts,
  Products,
  Button,
  image,
  SeoHeader,
  Embed,
  imageGallery,
  Quotes,
  marquee,
  Download,
]

export default createSchema({
  name: 'default',

  types: schemaTypes.concat([
    ...documents,
    ...pageComponents,
    ...objects,

    
  ])
})
