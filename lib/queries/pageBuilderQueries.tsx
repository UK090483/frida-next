import { imageMeta, artworkCard } from './snippets'

// PLUGS

const buttonPlug = ` 
_type == "button" => {
  internalLink->{
    _type,
    slug
  }
}
`
// Blocks

const artworkCarousel = `
_type == "artworkCarousel" => {
  'items': *[_type == 'artwork'] | order(_updatedAt desc) {
    ${artworkCard}
  }[0...15]
}
`

const carouselHero = `
_type == "carouselHero" => {
  carouselHeroItems[]{
    ...,
    'photo': image {
      ${imageMeta}
    }
   }
}
`
const artworks = `
_type == "artworks" => {
  'items': *[_type == 'artwork']{
    ${artworkCard}
  }
}
`

export { artworks, artworkCarousel, buttonPlug, carouselHero }
