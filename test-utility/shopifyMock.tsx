export const checkoutCreate = jest.fn()

jest.mock('shopify-buy', () => ({
  buildClient: () => ({ checkout: { create: checkoutCreate } }),
}))
