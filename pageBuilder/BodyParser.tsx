import React from 'react'

import ArtistBlock from './Blocks/ArtistsBlock'
import ArtworksBlock from './Blocks/ArtworkBlock'
import PostBlock from './Blocks/PostsBlock'
import ProductsBlock from './Blocks/ProductsBlock'
import CarouselHeroBlock from './Blocks/CarouselHeroBlock'
import CategoryBlock from './Blocks/CategoryBlock'
import Section from './Blocks/SectionBlock'
import RT from './Blocks/RichText'
import Marquee from './Blocks/Marquee'
import Quotes from './Blocks/QuotesBlock'

import ButtonPlug from './Plugs/ButtonPlug'
import EmbedPlug from './Plugs/EmbedPlug'
import ImagePlug from './Plugs/ImagePlug'
import SeoHeaderPlug from './Plugs/SeoHeader'
import ImageGalleryPlug from './Plugs/ImageGaleriePlug'

import ComponentNotFound from './component_not_found'
import { FridaLocation } from 'types'
import { PageBodyResult } from './pageBuilderQueries'
import InnerSectionPlug from './Plugs/innerSection'

type ContentParserProps = {
  content: PageBodyResult
  lang: FridaLocation
  extraComponents?: { [k: string]: React.ReactElement }
}

const BodyParser: React.FC<ContentParserProps> = (props) => {
  const { content, lang, extraComponents } = props

  return (
    <>
      {content &&
        content.map((blok) => {
          switch (blok._type) {
            case 'marquee':
              return <Marquee lang={lang} {...blok} key={blok._key} />
            case 'section':
              return <Section lang={lang} {...blok} key={blok._key} />
            case 'richText':
              return <RT {...blok} key={blok._key} />
            case 'block':
              return <RT {...blok} key={blok._key} />
            case 'artists':
              return <ArtistBlock lang={lang} {...blok} key={blok._key} />
            case 'artworks':
              return <ArtworksBlock lang={lang} {...blok} key={blok._key} />
            case 'posts':
              return <PostBlock lang={lang} {...blok} key={blok._key} />
            case 'products':
              return <ProductsBlock lang={lang} {...blok} key={blok._key} />
            case 'carouselHero':
              return <CarouselHeroBlock lang={lang} {...blok} key={blok._key} />
            case 'categories':
              return <CategoryBlock {...blok} key={blok._key} />
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
            case 'innerSection':
              return <InnerSectionPlug {...blok} key={blok._key} />

            default:
              return (
                //@ts-ignore
                (extraComponents && extraComponents[blok._type]) || (
                  //@ts-ignore
                  <ComponentNotFound type={blok} key={blok._key} />
                )
              )
          }
        })}
    </>
  )
}

export default BodyParser
