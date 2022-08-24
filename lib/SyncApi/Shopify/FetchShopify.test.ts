import {
  testData,
  mockShopifyClient,
  getFetchShopifyTestInstance,
} from '../tests/testUtils'

describe('Fetch Shopify', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should  init with product Id', () => {
    const FS = getFetchShopifyTestInstance()
    FS.init(testData.shopify.productId)
    expect(FS.productId).toBe(testData.shopify.productId)
  })
  it('fetch product', async () => {
    const FS = getFetchShopifyTestInstance()
    expect(FS.fetchProduct(testData.shopify.productId)).resolves.toEqual(
      testData.shopify.product.fromShopify
    )
    expect(mockShopifyClient.product.get).toHaveBeenCalledTimes(1)
    expect(mockShopifyClient.product.get).toHaveBeenCalledWith(
      testData.shopify.productId
    )
  })
  it('getChecksum should return checksum', async () => {
    expect(
      getFetchShopifyTestInstance().getChecksum(testData.shopify.productId)
    ).resolves.toBe(testData.shopify.checksum[0].value)
  })
  it('getChecksum should return null if not found', async () => {
    const FS = getFetchShopifyTestInstance(() => ({
      metafield: {
        list: jest.fn().mockImplementation(() => Promise.reject()),
      },
    }))
    const checksum = await FS.getChecksum(testData.shopify.productId)
    expect(checksum).toBe(null)
  })

  it('setChecksum should create Checksum', async () => {
    const FS = getFetchShopifyTestInstance()
    FS.init(testData.shopify.productId)
    await FS.setChecksum(testData.shopify.checksum[0].value)
    expect(mockShopifyClient.metafield.create).toHaveBeenCalledTimes(1)
    expect(mockShopifyClient.metafield.create).toHaveBeenCalledWith(
      testData.shopify.metadata
    )
  })

  it('createProduct ', async () => {
    const FS = getFetchShopifyTestInstance()
    FS.init(testData.shopify.productId)
    const createdProduct = await FS.createProduct(
      testData.shopify.createProduct,
      testData.shopify.checksum[0].value
    )
    expect(mockShopifyClient.product.create).toHaveBeenCalledTimes(1)
    expect(mockShopifyClient.metafield.create).toHaveBeenCalledTimes(1)
    expect(createdProduct).toEqual(testData.shopify.syncData)
  })

  it('updateProduct active ', async () => {
    const FS = getFetchShopifyTestInstance()

    const result = await FS.updateProduct(
      testData.shopify.productId,
      testData.shopify.createProduct,
      testData.shopify.checksum[0].value,
      false
    )
    expect(result).toEqual(testData.shopify.syncData)
    expect(mockShopifyClient.product.update).toBeCalledTimes(1)
    expect(mockShopifyClient.productVariant.update).toBeCalledTimes(1)
    expect(mockShopifyClient.metafield.create).toBeCalledTimes(1)
  })
  it('updateProduct draft ', async () => {
    const FS = getFetchShopifyTestInstance()

    const result = await FS.updateProduct(
      testData.shopify.productId,
      testData.shopify.createProduct,
      testData.shopify.checksum[0].value,
      true
    )
    expect(result).toEqual(testData.shopify.syncData)
    expect(mockShopifyClient.product.update).toBeCalledTimes(1)
    expect(mockShopifyClient.productVariant.update).toBeCalledTimes(1)
    expect(mockShopifyClient.metafield.create).toBeCalledTimes(1)
  })
})
