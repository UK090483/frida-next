export type FridaColors = 'white' | 'black' | 'pink' | 'red' | 'grey' | 'green'
export type ImageLayout = 'fill' | 'contain' | 'intrinsic'
export type FridaSizes = 's' | 'm' | 'l' | 'xl' | 'xxl'

export type GalleryTypes = 'grid' | 'carousel' | 'masonry'
export type FridaLocation = 'en' | 'de'
export interface ArtworkRecord {
  id: string
  slug: string
  availability: 'availabil' | 'sold'
  artworkName: string
  artistName: string
  price: number
  image: Image
  banner?: string
}

export type Image = {
  imageAssetId: string
}
