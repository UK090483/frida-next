import SanityArtwork from './SanityArtwork'
import { SanityClient } from '@sanity/client'

const testid = 'ti'

const testData = { _id: testid }
const testDataHandleMissing = {
  shopify_product_id: 'fg',
  _id: testid,
}
const testDataSyncedProductIdMissing = {
  shopify_handle: 'fdfg',
  _id: testid,
}
const testDataSyncedBefore = {
  shopify_handle: 'fdfg',
  shopify_product_id: 'fg',
  _id: testid,
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
  console.error = jest.fn()
  it('getData fail', async () => {
    const Artwork = new SanityArtwork(testid, getClient())
    expect(Artwork.loaded).toEqual(false)
    const fetched = await Artwork.getData()
    expect(fetched).toEqual(null)
    expect(Artwork.loaded).toEqual(true)
  })
  it('getData success', async () => {
    const Artwork = new SanityArtwork(testid, getClient({ fetchRes: testData }))
    const fetched = await Artwork.getData()
    expect(fetched).toEqual(testData)
    expect(Artwork.loaded).toEqual(true)
  })
  it('shouldSync without calling data first', async () => {
    const Artwork = new SanityArtwork(testid, getClient())
    let e: unknown = null
    try {
      Artwork.shouldSync()
    } catch (error) {
      e = error
    }
    expect(e).toBeTruthy()
  })
  it('shouldSync without data or non artwork', async () => {
    const Artwork = new SanityArtwork(testid, getClient())
    await Artwork.getData()
    expect(Artwork.shouldSync()).toBe(false)
  })
  it('shouldSync with syncdata handleMissing', async () => {
    const Artwork = new SanityArtwork(
      testid,
      getClient({ fetchRes: testDataHandleMissing })
    )
    await Artwork.getData()
    expect(Artwork.shouldSync()).toBe(true)
  })
  it('shouldSync with syncdata productId Missing', async () => {
    const Artwork = new SanityArtwork(
      testid,
      getClient({ fetchRes: testDataSyncedProductIdMissing })
    )
    await Artwork.getData()
    expect(Artwork.shouldSync()).toBe(true)
  })
  it('shouldSync with syncdata synced before', async () => {
    const Artwork = new SanityArtwork(
      testid,
      getClient({ fetchRes: testDataSyncedBefore })
    )
    await Artwork.getData()
    expect(Artwork.shouldSync()).toBe(false)
  })
})
