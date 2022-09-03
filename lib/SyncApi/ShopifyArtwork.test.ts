import ShopifyArtwork from './ShopifyArtwork'
import { testData, loggerMock, mockShopifyClient } from './tests/testUtils'

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

  it('createProduct ', async () => {
    const SA = preparedShopifyArtwork()
    const createdProduct = await SA.createArtwork(
      testData.shopify.createProduct,
      testData.shopify.checksum[0].value
    )
    expect(mockShopifyClient.product.create).toHaveBeenCalledTimes(1)
    expect(mockShopifyClient.metafield.create).toHaveBeenCalledTimes(1)
    expect(createdProduct).toEqual(testData.shopify.syncData)
  })
  it('updateProduct active', async () => {
    const SA = preparedShopifyArtwork()
    const result = await SA.updateArtwork(
      testData.shopify.productId,
      testData.shopify.createProduct,
      testData.shopify.checksum[0].value,
      false
    )
    expect(result).toEqual(testData.shopify.syncData)
    expect(mockShopifyClient.product.update).toBeCalledTimes(1)
    expect(mockShopifyClient.product.update).toBeCalledWith(
      testData.shopify.product.testId,
      testData.shopify.product.updatePayload
    )
    expect(mockShopifyClient.productVariant.update).toBeCalledTimes(1)
    expect(mockShopifyClient.productVariant.update).toBeCalledWith(
      testData.shopify.variant.testId,
      testData.shopify.variant.updatePayload
    )
    expect(mockShopifyClient.metafield.create).toBeCalledTimes(1)
  })

  it('updateProduct draft ', async () => {
    const SA = preparedShopifyArtwork()
    const result = await SA.updateArtwork(
      testData.shopify.productId,
      testData.shopify.createProduct,
      testData.shopify.checksum[0].value,
      true
    )
    expect(result).toEqual(testData.shopify.syncData)
    expect(mockShopifyClient.product.update).toBeCalledTimes(1)
    expect(mockShopifyClient.product.update).toBeCalledWith(
      testData.shopify.product.testId,
      { ...testData.shopify.product.updatePayload, status: 'draft' }
    )
    expect(mockShopifyClient.productVariant.update).toBeCalledTimes(1)
  })

  it('updateProduct price ', async () => {
    const SA = preparedShopifyArtwork()
    const result = await SA.updateArtwork(
      testData.shopify.productId,
      { ...testData.shopify.createProduct, price: 500 },
      testData.shopify.checksum[0].value,
      false
    )
    expect(result).toEqual(testData.shopify.syncData)
    expect(mockShopifyClient.product.update).toBeCalledTimes(1)
    expect(mockShopifyClient.product.update).toBeCalledWith(
      testData.shopify.product.testId,
      testData.shopify.product.updatePayload
    )
    expect(mockShopifyClient.productVariant.update).toBeCalledTimes(1)
    expect(mockShopifyClient.productVariant.update).toBeCalledWith(
      testData.shopify.variant.testId,
      { ...testData.shopify.variant.updatePayload, price: 500 }
    )
  })
  it('updateProduct description ', async () => {
    const SA = preparedShopifyArtwork()
    const result = await SA.updateArtwork(
      testData.shopify.productId,
      { ...testData.shopify.createProduct, description: 'testDescription' },
      testData.shopify.checksum[0].value,
      false
    )
    expect(result).toEqual(testData.shopify.syncData)
    expect(mockShopifyClient.product.update).toBeCalledTimes(1)
    expect(mockShopifyClient.product.update).toBeCalledWith(
      testData.shopify.product.testId,
      {
        ...testData.shopify.product.updatePayload,
        body_html: '<p>testDescription</p>',
      }
    )
    expect(mockShopifyClient.productVariant.update).toBeCalledTimes(1)
    expect(mockShopifyClient.productVariant.update).toBeCalledWith(
      testData.shopify.variant.testId,
      { ...testData.shopify.variant.updatePayload }
    )
  })
  it('updateProduct title', async () => {
    const SA = preparedShopifyArtwork()
    const result = await SA.updateArtwork(
      testData.shopify.productId,
      { ...testData.shopify.createProduct, name: 'testName' },
      testData.shopify.checksum[0].value,
      false
    )
    expect(result).toEqual(testData.shopify.syncData)
    expect(mockShopifyClient.product.update).toBeCalledTimes(1)
    expect(mockShopifyClient.product.update).toBeCalledWith(
      testData.shopify.product.testId,
      {
        ...testData.shopify.product.updatePayload,
        title: 'testName',
      }
    )
    expect(mockShopifyClient.productVariant.update).toBeCalledTimes(1)
    expect(mockShopifyClient.productVariant.update).toBeCalledWith(
      testData.shopify.variant.testId,
      { ...testData.shopify.variant.updatePayload }
    )
  })

  it('updateProduct Availability', async () => {
    const SA = preparedShopifyArtwork()
    const result = await SA.updateArtwork(
      testData.shopify.productId,
      { ...testData.shopify.createProduct, availability: 'sold' },
      testData.shopify.checksum[0].value,
      false
    )
    expect(result).toEqual(testData.shopify.syncData)
    expect(mockShopifyClient.product.update).toBeCalledTimes(1)
    expect(mockShopifyClient.product.update).toBeCalledWith(
      testData.shopify.product.testId,
      {
        ...testData.shopify.product.updatePayload,
        status: 'draft',
      }
    )
    expect(mockShopifyClient.productVariant.update).toBeCalledTimes(1)
    expect(mockShopifyClient.productVariant.update).toBeCalledWith(
      testData.shopify.variant.testId,
      { ...testData.shopify.variant.updatePayload }
    )
  })
})
