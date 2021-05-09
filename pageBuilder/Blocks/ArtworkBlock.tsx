import React from 'react'

import Artworks from '@components/ArtworkGallery/ArtworkGallery'
import { FridaLocation } from 'types'

type ArtworksBlockProps = {
  items: any[]
  lang: FridaLocation
}

const ArtworksBlock: React.FC<ArtworksBlockProps> = (props) => {
  const { items, lang } = props

  return <Artworks items={items} lang={lang} />
}

export default ArtworksBlock
