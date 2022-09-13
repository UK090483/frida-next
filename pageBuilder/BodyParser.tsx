import React from 'react'

import ArtistBlock from './Blocks/ArtistBlock/ArtistsBlock'
import ArtworksBlock from './Blocks/ArtworkBlock/ArtworkBlock'
import PostBlock from './Blocks/PostsBlock/PostsBlock'
import ProductsBlock from './Blocks/ProductsBlock/ProductsBlock'
import CarouselHeroBlock from './Blocks/CarouselHeroBlock/CarouselHeroBlock'
import CategoryBlock from './Blocks/CategoryBlock/CategoryBlock'
import Section from './Blocks/SectionBlock/SectionBlock'
import RT from './Blocks/RichText/RichText'
import Marquee from './Blocks/Marquee/Marquee'
import Quotes from './Blocks/QuotesBlock/QuotesBlock'

import ButtonPlug from './Plugs/ButtonPlug'
import EmbedPlug from './Plugs/EmbedPlug'
import ImagePlug from './Plugs/ImagePlug'
import SeoHeaderPlug from './Plugs/SeoHeader'
import ImageGalleryPlug from './Plugs/ImageGaleriePlug'

import ComponentNotFound from './component_not_found'
import { FridaLocation } from 'types'
import { PageBodyResult } from './pageBuilderQueries'
// import InnerSectionPlug from './Plugs/innerSection'
import SpacerPlug from './Plugs/Spacer'
import DownLoadPlug from './Plugs/DownLoadPlug'
import { useRouter } from 'next/router'

type ContentParserProps = {
  content: PageBodyResult
  extraComponents?: { [k: string]: React.ReactElement }
}

const BodyParser: React.FC<ContentParserProps> = (props) => {
  const { content, extraComponents } = props
  const { locale } = useRouter()
  const lang: FridaLocation = locale === 'en' ? 'en' : 'de'
  return (
    <>
      {content &&
        content.map((blok) => {
          if (extraComponents && extraComponents[blok._type]) {
            return extraComponents[blok._type]
          }

          switch (blok._type) {
            case 'marquee':
              return <Marquee {...blok} key={blok._key} />
            case 'section':
              return <Section {...blok} key={blok._key} />
            case 'richText':
              return <RT {...blok} key={blok._key} />
            case 'block':
              return <RT {...blok} key={blok._key} />
            case 'artists':
              return <ArtistBlock {...blok} key={blok._key} />
            case 'artworks':
              return <ArtworksBlock {...blok} key={blok._key} />
            case 'posts':
              return <PostBlock {...blok} key={blok._key} />
            case 'products':
              return <ProductsBlock lang={lang} {...blok} key={blok._key} />
            case 'carouselHero':
              return <CarouselHeroBlock {...blok} key={blok._key} />
            case 'categories':
              return <CategoryBlock lang={lang} {...blok} key={blok._key} />
            case 'embed':
              return <EmbedPlug {...blok} key={blok._key} />
            case 'button':
              return <ButtonPlug {...blok} key={blok._key} />
            case 'imagePlug':
              return <ImagePlug {...blok} key={blok._key} />
            case 'seoHeader':
              return <SeoHeaderPlug {...blok} key={blok._key} />
            case 'quotes':
              return <Quotes {...blok} key={blok._key} />
            case 'imageGalleryPlug':
              return <ImageGalleryPlug {...blok} key={blok._key} />
            // case 'innerSection':
            //   return <InnerSectionPlug {...blok} key={blok._key} />
            case 'spacer':
              return <SpacerPlug {...blok} key={blok._key} />
            case 'download':
              return <DownLoadPlug {...blok} key={blok._key} />

            default:
              return <ComponentNotFound blok={blok} key={blok._key} />
          }
        })}
    </>
  )
}

export default BodyParser
