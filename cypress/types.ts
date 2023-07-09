import { PageBodyResult } from '../pageBuilder/pageBuilderQueries'
export type Artist = {
  anzeigeName: string
  slug: string
  description?: string
}

export type Artwork = {
  slug: string
  description?: string
  name: string
  isNft?: boolean
  price: number
  artistName: string
}

export type Page = {
  slug: string
  content: PageBodyResult
}
