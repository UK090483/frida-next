import SanitySyncHandler from './SanitySyncHandler'
import {
  testData,
  mockShopifyClient,
  loggerMock,
  axiosReturnData,
  mockSanityClient,
} from './tests/testUtils'

jest.mock('axios')

const getPreparedSanitySyncHandler = () => {
  return new SanitySyncHandler(
    testData.sanity.testId,
    mockSanityClient,
    mockShopifyClient,
    loggerMock
  )
}

describe('Sanity Sync Handler', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should construct', () => {
    getPreparedSanitySyncHandler()
  })

  it('getAction: no Sanity Artwork found', async () => {
    const Sh = getPreparedSanitySyncHandler()
    const axios = axiosReturnData(() => undefined)
    const action = await Sh.getAction()
    expect(axios).toHaveBeenCalledTimes(2)
    expect(action).toBe('sanity-artwork-notFound')
  })

  it('getAction: sanity draft Artwork no syncData', async () => {
    const Sh = getPreparedSanitySyncHandler()
    const axios = axiosReturnData((url) =>
      url.includes('drafts') ? testData.sanity.testArtwork : undefined
    )
    const action = await Sh.getAction()
    expect(axios).toHaveBeenCalledTimes(2)
    expect(action).toBe('create')
  })

  it('getAction: should get sanity Artwork no syncData', async () => {
    const Sh = getPreparedSanitySyncHandler()
    const axios = axiosReturnData(() => testData.sanity.testArtwork)
    const action = await Sh.getAction()
    expect(axios).toHaveBeenCalledTimes(1)
    expect(action).toBe('create')
    expect(loggerMock).toHaveBeenCalledWith('info', 'was not synced before')
  })

  it('getAction: Artwork with syncData | checksum/product not found', async () => {
    const spy = jest.spyOn(mockShopifyClient.metafield, 'list')
    spy.mockImplementationOnce(() =>
      //@ts-ignore
      Promise.reject('')
    )
    const Sh = getPreparedSanitySyncHandler()
    const axios = axiosReturnData(() => testData.sanity.testArtworkWithSyncData)
    const action = await Sh.getAction()
    expect(axios).toHaveBeenCalledTimes(1)
    expect(action).toBe('create')
    expect(loggerMock).toHaveBeenCalledWith(
      'info',
      'no corresponding found on shopify'
    )
  })

  it('getAction: Artwork with syncData | checksum  equal', async () => {
    const spy = jest.spyOn(mockShopifyClient.metafield, 'list')
    spy.mockImplementationOnce(() =>
      //@ts-ignore
      Promise.resolve([
        {
          ...testData.shopify.metadata,
          value: '{"isDraft":false,"description":""}',
        },
      ])
    )
    const Sh = getPreparedSanitySyncHandler()
    const axios = axiosReturnData(() => testData.sanity.testArtworkWithSyncData)
    const action = await Sh.getAction()
    expect(axios).toHaveBeenCalledTimes(1)
    expect(action).toBe(undefined)
    expect(loggerMock).toHaveBeenCalledWith(
      'info',
      'checksum is equal, sync done!'
    )
  })
  it('getAction: Artwork with syncData | checksum not equal', async () => {
    const spy = jest.spyOn(mockShopifyClient.metafield, 'list')
    spy.mockImplementationOnce(() =>
      //@ts-ignore
      Promise.resolve([
        {
          ...testData.shopify.metadata,
          value: '{"isDraft":false,"description":"new"}',
        },
      ])
    )
    const Sh = getPreparedSanitySyncHandler()
    const axios = axiosReturnData(() => testData.sanity.testArtworkWithSyncData)
    const action = await Sh.getAction()
    expect(axios).toHaveBeenCalledTimes(1)
    expect(action).toBe('update')
    expect(loggerMock).toHaveBeenCalledWith('info', 'checksum is not equal')
  })

  it('createArtwork', async () => {
    const Sh = getPreparedSanitySyncHandler()
    Sh.sanityArtwork.getCheckSum = () =>
      Promise.resolve(testData.shopify.checksum[0].value)
    axiosReturnData(() => testData.sanity.completeArtwork)

    await Sh.createShopifyArtwork()

    // create Product
    expect(mockShopifyClient.product.create).toHaveBeenCalledTimes(1)
    expect(mockShopifyClient.product.create).toHaveBeenCalledWith(
      testData.shopify.shopifyCreateProductResult
    )
    expect(loggerMock).toHaveBeenCalledWith('info', '___Create Artwork')
    expect(loggerMock).toHaveBeenCalledWith(
      'info',
      'creating product createProduct.Name '
    )

    // setting product listing
    expect(mockShopifyClient.productListing.create).toHaveBeenCalledTimes(1)
    expect(mockShopifyClient.productListing.create).toHaveBeenCalledWith(
      testData.shopify.productId,
      { product_id: testData.shopify.productId }
    )
    // setting checkSum
    expect(mockShopifyClient.metafield.create).toHaveBeenCalledTimes(1)
    expect(mockShopifyClient.metafield.create).toHaveBeenCalledWith(
      testData.shopify.metadata
    )
    // updating Sanity Artwork
    expect(mockSanityClient.patch).toHaveBeenCalledTimes(1)
    expect(mockSanityClient.patch).toHaveBeenCalledWith(testData.sanity.testId)
    expect(mockSanityClient.patch('').set).toHaveBeenCalledTimes(1)
    expect(mockSanityClient.patch('').set).toHaveBeenCalledWith(
      testData.shopify.syncData
    )
  })
  it('should update', async () => {
    const Sh = getPreparedSanitySyncHandler()
    Sh.shopifyArtwork.productId = testData.shopify.productId
    await Sh.updateShopifyArtwork()

    // updating
    expect(mockShopifyClient.product.update).toHaveBeenCalledTimes(1)
    expect(mockShopifyClient.productVariant.update).toBeCalledTimes(1)
    // updating Sanity Artwork
    expect(mockSanityClient.patch).toHaveBeenCalledTimes(1)
    expect(mockSanityClient.patch).toHaveBeenCalledWith(testData.sanity.testId)
    expect(mockSanityClient.patch('').set).toHaveBeenCalledTimes(1)
    expect(mockSanityClient.patch('').set).toHaveBeenCalledWith(
      testData.shopify.syncData
    )
  })
})
