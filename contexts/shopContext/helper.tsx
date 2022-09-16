import { ImageMetaResult } from 'pageBuilder/queries/snippets'
export const cookieName = 'accept_cookies'
export type FetchVariantResult = {
  lineID: string | number
  _type: 'artwork' | 'productVariant'
  product: {
    title: string | null
    slug: string | null
    subTitle: string | null
  }
  id: string
  title: string
  price: number
  quantity: number
  photos: {
    default: null | ImageMetaResult[]
    cart: { forOption: string; photos: null | ImageMetaResult[] }[] | null
    listingPhotos: { listingPhoto: null | ImageMetaResult }[]
  }
  options: { name: string; position: number; value: string }
}
export const fetchVariant = async (id: string) => {
  let variant: FetchVariantResult | null = null
  try {
    const res = await fetch(`/api/productCard/?id=${id}`)

    variant = await res.json()
  } catch (error) {
    return null
  }

  // as FetchVariantResult | null

  return variant
}

export const fetchArtwork = async (id: string) => {
  let variant: FetchVariantResult | null = null
  try {
    const res = await fetch(`/api/productCard/?id=${id}&type=artwork`)

    variant = await res.json()
  } catch (error) {
    return null
  }

  // as FetchVariantResult | null

  return variant
}

export const checkIfCookieExcepted: () => boolean = () => {
  if (typeof window !== `undefined` && document) {
    return (
      document?.cookie
        .split(';')
        .find((row) => row.includes(cookieName))
        ?.split('=')[1] === 'accepted'
    )
  }

  return false
}
