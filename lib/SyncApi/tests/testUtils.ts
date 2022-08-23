import { SanityClient } from '@sanity/client'
import axios from 'axios'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

export const axiosReturnData = (cb: (url: string) => any) => {
  mockedAxios.get.mockReset()
  return mockedAxios.get.mockImplementation((url) => {
    return Promise.resolve({ data: { documents: [cb(url)] } })
  })
}

export const testId = '123abc'
export const draftTestId = 'drafts.123abc'

export const testArtwork = {
  _type: 'artwork',
  _id: testId,
}

export const checksumData = {
  isDraft: false,
  imageSrc: 'this.data.imageSrc',
  name: 'this.data.name',
  description: 'this.data.description',
  price: 'this.data.price',
  availability: 'this.data.availability',
}

export const syncData = {
  shopify_product_id: 'shopify_product_id',
  shopify_variant_id: 'shopify_variant_id',
  shopify_handle: 'shopify_handle',
}

export type getClientProps = {
  fetchRes?: unknown
}
export const getClient = (props?: getClientProps) => {
  return {
    fetch: async () => props?.fetchRes || null,
    patch: () => ({ set: () => ({ commit: () => ({}) }) }),
  } as unknown as SanityClient
}
