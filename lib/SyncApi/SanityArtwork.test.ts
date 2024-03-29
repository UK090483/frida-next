import SanityArtwork from './SanityArtwork'
import {
  testId,
  testArtwork,
  checksumData,
  draftTestId,
  syncData,
  getSanityTestClient,
  axiosReturnData,
  loggerMock,
  sanityImage,
} from './tests/testUtils'

jest.mock('axios')

const ArtworkWithData = async (cb: (url: string) => any) => {
  axiosReturnData(cb)
  const Artwork = new SanityArtwork(testId, getSanityTestClient(), loggerMock)
  await Artwork.init()
  return Artwork
}

describe('SanityArtwork', () => {
  it('init should ignore/ not Load none Artwork', async () => {
    const Artwork = await ArtworkWithData(() => ({
      ...testArtwork,
      _type: 'noneArtwork',
    }))
    expect(Artwork.data).toBe(null)
  })
  it('init should ignore/not-Load nft Artwork', async () => {
    const Artwork = await ArtworkWithData(() => ({
      ...testArtwork,
      isNft: true,
    }))
    expect(Artwork.data).toBe(null)
  })

  it('init should get published Artwork', async () => {
    const Artwork = await ArtworkWithData(() => testArtwork)
    expect(Artwork.data?._id).toBe(testId)
    expect(Artwork.isDraft).toBe(false)
  })
  it('init should get draft Artwork', async () => {
    const Artwork = await ArtworkWithData((url) =>
      url.includes('drafts') ? { ...testArtwork, _id: draftTestId } : undefined
    )
    expect(Artwork.data?._id).toBe(draftTestId)
    expect(Artwork.id).toBe(draftTestId)
    expect(Artwork.isDraft).toBe(true)
  })
  it('init should create image url', async () => {
    const Artwork = await ArtworkWithData(() => ({
      ...testArtwork,
      image: sanityImage,
    }))
    expect(Artwork.data?.imageSrc).toBe(undefined)
  })
  it('should handle sync ', async () => {
    let Artwork = await ArtworkWithData(() => testArtwork)
    expect(Artwork.hasSyncData()).toBe(false)
    Artwork = await ArtworkWithData(() => ({ ...testArtwork, ...syncData }))
    expect(Artwork.hasSyncData()).toBe(true)
  })
  it('should handle checksum ', async () => {
    let Artwork = await ArtworkWithData(() => undefined)
    let checkSum = await Artwork.getCheckSum()
    expect(checkSum).toBe(JSON.stringify(undefined))
    Artwork = await ArtworkWithData(() => ({
      ...testArtwork,
      ...checksumData,
    }))
    checkSum = await Artwork.getCheckSum()
    expect(checkSum).toBe(JSON.stringify(checksumData))
  })
  it('should set SyncData ', async () => {
    const Artwork = await ArtworkWithData(() => testArtwork)
    await Artwork.setSyncData({
      shopify_product_id: 'shopify_product_id',
      shopify_handle: 'shopify_handle',
      shopify_variant_id: 'shopify_variant_id',
    })
  })
  it('should get getShopifyId ', async () => {
    let Artwork = await ArtworkWithData(() => testArtwork)
    expect(Artwork.getShopifyId()).toBeFalsy()
    Artwork = await ArtworkWithData(() => ({ ...testArtwork, ...syncData }))
    expect(Artwork.getShopifyId()).toBe(syncData.shopify_product_id)
  })
})
