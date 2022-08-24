import ShopifyArtwork from './ShopifyArtwork'
import { testData, loggerMock, mockShopifyClient } from '../tests/testUtils'

const preparedShopifyArtwork = () => {
  const SA = new ShopifyArtwork({
    productId: testData.shopify.productId,
    logger: loggerMock,
    shopifyClient: mockShopifyClient,
  })

  return SA
}
describe('ShopifyArtwork', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should getData ', async () => {
    const SA = preparedShopifyArtwork()
    await SA.getData()
    expect(mockShopifyClient.product.get).toBeCalledTimes(1)
    expect(SA.data).toEqual(testData.shopify.product.fromShopify)
    await SA.getData()
    expect(mockShopifyClient.product.get).toBeCalledTimes(1)
  })

  it('should getChecksum ', async () => {
    const SA = preparedShopifyArtwork()
    const checksum1 = await SA.getCheckSum()
    expect(checksum1).toBe(testData.shopify.checksum[0].value)
    expect(mockShopifyClient.metafield.list).toBeCalledTimes(1)
    const checksum2 = await SA.getCheckSum()
    expect(checksum2).toBe(testData.shopify.checksum[0].value)
    expect(mockShopifyClient.metafield.list).toBeCalledTimes(1)
  })
  it('should setChecksum ', async () => {
    const SA = preparedShopifyArtwork()
    await SA.setChecksum(testData.shopify.checksum[0].value)
    expect(mockShopifyClient.metafield.create).toBeCalledTimes(1)
    expect(mockShopifyClient.metafield.create).toHaveBeenCalledWith(
      testData.shopify.metadata
    )
  })
})
