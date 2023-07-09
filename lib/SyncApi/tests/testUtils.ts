import { SanityClient } from '@sanity/client'
import axios from 'axios'
import Shopify from 'shopify-api-node'
import type { Logger } from '../logger'
import { SanityProduct } from '../SanityArtwork'

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

const shopifyProductTestID = 12345
const shopifyVariantTestID = 23456

const checksumValue = 'checksumValue'

export const sanityImage = {
  asset: { _ref: 'sanity-test-image', _type: 'reference' },
}

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
  shopify_product_id: shopifyProductTestID + '',
  shopify_variant_id: shopifyVariantTestID + '',
  shopify_handle: 'shopify_handle',
}

export type getClientProps = {
  fetchRes?: unknown
}
export const getSanityTestClient = (props?: getClientProps) => {
  return {
    fetch: async () => props?.fetchRes || null,
    patch: () => ({ set: () => ({ commit: () => ({}) }) }),
  } as unknown as SanityClient
}

export const shopifyCreateProductResult = {
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
  variants: [
    {
      inventory_management: 'shopify',
      inventory_quantity: 1,
      price: 200,
      requires_shipping: false,
    },
  ],
  vendor: 'MeetFrida',
}

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

const sanityArtworkProperties = {
  name: 'createProduct.Name',
  description: 'createProduct.Description',
  imageSrc: 'createProduct.ImageSrc',
  price: 200,
}

export const testData = {
  sanity: {
    testId,
    draftTestId,
    testArtwork,
    testArtworkWithSyncData: { ...testArtwork, ...syncData },
    completeArtwork: {
      ...testArtwork,
      ...syncData,
      ...sanityArtworkProperties,
    },
  },
  shopify: {
    productId: shopifyProductTestID,
    product: {
      testId: shopifyProductTestID,
      fromShopify: shopifyProduct,
      updatePayload: {
        body_html: `<p>${sanityArtworkProperties.description}</p>`,
        product_type: 'artwork',
        published_scope: 'global',
        status: 'active',
        title: sanityArtworkProperties.name,
        vendor: 'MeetFrida',
        images: [
          {
            src: 'createProduct.ImageSrc',
          },
        ],
      },
    },
    variant: {
      testId: shopifyVariantTestID,
      updatePayload: {
        price: 200,
      },
    },
    shopifyCreateProductResult,
    createProduct: {
      ...sanityArtworkProperties,
    } as SanityProduct,
    checksum: [{ key: 'checksum_syncData', value: 'checksumValue' }],
    metadata: {
      key: 'checksum_syncData',
      namespace: 'syncData',
      type: 'multi_line_text_field',
      owner_resource: 'product',
      value: checksumValue,
      owner_id: shopifyProductTestID,
    },
    syncData: {
      shopify_product_id: shopifyProductTestID + '',
      shopify_variant_id: shopifyVariantTestID + '',
      shopify_handle: shopifyProduct.handle,
    },
  },
}
const setFunction = jest.fn().mockImplementation(() => {
  return { commit: jest.fn().mockImplementation(() => Promise.resolve()) }
})
export const mockSanityClient = {
  fetch: jest.fn().mockImplementation(() => Promise.resolve('')),
  patch: jest.fn().mockImplementation(() => ({
    set: setFunction,
  })),
} as unknown as SanityClient

export const mockShopifyClient = {
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
    update: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(testData.shopify.product.fromShopify)
      ),
  },
  productVariant: {
    update: jest
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

export const loggerMock = jest.fn() as Logger
