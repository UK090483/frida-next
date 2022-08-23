import FetchShopify from './FetchShopify'
import Shopify from 'shopify-api-node'
import { SanityProduct } from '../SanityArtwork'
import { log } from '../logging'

const mockShopifyClient = {
  product: {
    get: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(testData.shopify.product.fromShopify)
      ),
    create: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(testData.shopify.product.fromShopify)
      ),
  },
  productListing: {
    create: jest.fn().mockImplementation(() => Promise.resolve()),
  },
  metafield: {
    list: jest
      .fn()
      .mockImplementation(() => Promise.resolve(testData.shopify.checksum)),
    create: jest
      .fn()
      .mockImplementation(() => Promise.resolve(testData.shopify.checksum)),
  },
} as unknown as Shopify

const shopifyProductTestID = 12345
const shopifyVariantTestID = 12345

const shopifyProduct = {
  id: shopifyProductTestID,
  body_html: '<p>createProduct.Description</p>',
  images: [
    {
      src: 'createProduct.ImageSrc',
    },
  ],
  product_type: 'artwork',
  published_scope: 'global',
  status: 'active',
  title: 'createProduct.Name',
  handle: 'handle',

  variants: [
    {
      id: shopifyVariantTestID,
      inventory_management: 'shopify',
      inventory_quantity: 1,
      price: 200,
      requires_shipping: false,
    },
  ],
}

const testData = {
  shopify: {
    productId: shopifyProductTestID,
    product: {
      fromShopify: shopifyProduct,
    },
    createProduct: {
      name: 'createProduct.Name',
      description: 'createProduct.Description',
      imageSrc: 'createProduct.ImageSrc',
      price: 200,
    } as SanityProduct,
    checksum: [{ key: 'checksum_syncData', value: 'checksumValue' }],
    metadata: {
      key: 'checksum_syncData',
      namespace: 'syncData',
      value_type: 'string',
      owner_resource: 'product',
      value: 'checksumValue',
      owner_id: shopifyProductTestID,
    },
    syncData: {
      shopify_product_id: shopifyProductTestID + '',
      shopify_variant_id: shopifyVariantTestID + '',
      shopify_handle: shopifyProduct.handle,
    },
  },
}

const loggerMock = jest.fn() as typeof log

const getFetchShopifyTestInstance = (overwrite?: (shopify: Shopify) => any) => {
  const or = overwrite ? overwrite(mockShopifyClient) : {}

  const withOverwrites = { ...mockShopifyClient, ...or } as unknown as Shopify
  return new FetchShopify(withOverwrites, loggerMock)
}

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
})
