import ArtistBlock from './Blocks/ArtistsBlock'
import ArtworksBlock from './Blocks/ArtworkBlock'
import PostBlock from './Blocks/PostsBlock'
import ProductsBlock from './Blocks/ProductsBlock'
import CarouselHeroBlock from './Blocks/CarouselHeroBlock'
import CategoryBlock from './Blocks/CategoryBlock'
import Section from './Blocks/SectionBlock'
import RT from './RichText'

import ButtonPlug from './Plugs/ButtonPlug'
import EmbedPlug from './Plugs/EmbedPlug'
import ImagePlug from './Plugs/ImagePlug'

import ComponentNotFound from './component_not_found'
// import Supporter from "./Supporter"

const ComponentList: { [T: string]: any } = {
  embed: EmbedPlug,
  products: ProductsBlock,
  categories: CategoryBlock,
  artworks: ArtworksBlock,
  section: Section,
  button: ButtonPlug,
  richText: RT,
  block: RT,
  artists: ArtistBlock,
  posts: PostBlock,
  carouselHero: CarouselHeroBlock,
  imagePlug: ImagePlug,
}

const Components = (type?: string | undefined) => {
  if (!type || typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components
