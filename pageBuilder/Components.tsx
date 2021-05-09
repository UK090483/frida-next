import ArtworksBlock from './Blocks/ArtworkBlock'
import ArtworkCarousel from './Blocks/ArtworkCarousel'
import CarouselHeroBlock from './Blocks/CarouselHeroBlock'
import CategoryBlock from './Blocks/CategoryBlock'
// import Hero from "./Blocks/HeroBlock"
import Section from './Blocks/SectionBlock'
// import Spacer from "./Blocks/SpacerBlock"
import ComponentNotFound from './component_not_found'
import ButtonPlug from './Plugs/ButtonPlug'
import RT from './RichText'
// import Supporter from "./Supporter"

const ComponentList: { [T: string]: any } = {
  categories: CategoryBlock,
  artworks: ArtworksBlock,
  section: Section,
  button: ButtonPlug,
  // spacer: Spacer,
  richText: RT,
  block: RT,
  // supporter: Supporter,
  // hero: Hero,
  carouselHero: CarouselHeroBlock,
  artworkCarousel: ArtworkCarousel,
}

const Components = (type?: string | undefined) => {
  if (!type || typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components
