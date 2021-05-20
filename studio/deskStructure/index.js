import S from '@sanity/desk-tool/structure-builder'

import ArtworksbyArtists from './ArtworksbyArtists'
import ArtWorks from './Artworks'
import Artists from './Artists'
import WebPage from './webpage/Webpage'
import Shop from './Shop'
import Blog from './blog/Blog'

export default () =>
  S.list()
    .title('Content')
    .items([ArtWorks, Artists, WebPage, Shop, Blog])
