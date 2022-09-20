import S from '@sanity/desk-tool/structure-builder'

import Artworks from './Artworks'
import Artists from './Artists'
import WebPage from './webpage/Webpage'
import Shop from './Shop'
import Blog from './blog/Blog'
import Exhibition from './Exhibition'

export default () =>
  S.list()
    .title('Content')
    .items([Artworks, Artists, WebPage, Exhibition, Shop, Blog])
