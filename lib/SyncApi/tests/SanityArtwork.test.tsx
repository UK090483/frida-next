import SanityArtwork from '../SanityArtwork'
import { SanityClient } from '@sanity/client'
import axios from 'axios'
const testid = 'ti'
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testDataSyncedBefore = {
  _type: 'artwork',
  shopify_handle: 'fdfg',
  shopify_product_id: 'fg',
  shopify_variant_id: 'fg',
  _id: testid,
}

const returnData = (d: any) => {
  mockedAxios.get.mockReset()
  return mockedAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { documents: [d] } })
  )
}

type getClientProps = {
  fetchRes?: unknown
}
const getClient = (props?: getClientProps) => {
  return {
    fetch: async () => props?.fetchRes || null,
  } as unknown as SanityClient
}

describe('SanityArtwork', () => {
  let Artwork: SanityArtwork

  beforeEach(() => {
    Artwork = new SanityArtwork(testid, getClient())
  })
  console.error = jest.fn()
  it('getData no artwork', async () => {
    returnData({ _type: 'noArtwork' })

    expect(Artwork.loaded).toEqual(false)
    const fetched = await Artwork.getData()
    expect(fetched).toEqual(null)
    expect(Artwork.loaded).toEqual(true)
  })
  it('getData success', async () => {
    returnData({ _type: 'artwork' })
    const fetched = await Artwork.getData()
    expect(fetched).toMatchSnapshot()
    expect(Artwork.loaded).toEqual(true)
  })
  it('shouldSync without calling data first should throw', async () => {
    returnData({ _type: 'artwork' })
    let e: unknown = null
    try {
      Artwork.shouldSync()
    } catch (error) {
      e = error
    }
    expect(e).toBeTruthy()
  })
  it('shouldSync without data or non artwork', async () => {
    returnData({ _type: 'NoArtwork' })
    await Artwork.getData()
    expect(Artwork.shouldSync()).toBe(false)
  })

  it('shouldSync with syncdata synced before', async () => {
    returnData(testDataSyncedBefore)
    await Artwork.getData()
    expect(Artwork.shouldSync()).toBe(false)
  })
})
