import { Base64 } from 'base64-string'
import { useContext } from 'react'
import { setCheckoutState, shopifyVariantGID, SiteContext } from './context'

// Access our cart items
function useCartItems() {
  const {
    context: { checkout },
  } = useContext(SiteContext)

  return checkout.lineItems
}

// Add an item to the checkout cart
function useAddItem() {
  const {
    context: { checkout, shopifyClient },
    setContext,
  } = useContext(SiteContext)

  async function addItem(
    variantID: string,
    quantity: number,
    attributes: undefined | { key: string; value: string }[]
  ) {
    // Bail if no ID or quantity given
    if (!variantID || !quantity || !shopifyClient || !checkout.id) return

    // Otherwise, start adding the product
    setContext((prevState) => {
      return { ...prevState, isAdding: true, isUpdating: true }
    })

    // build encoded variantID
    const enc = new Base64()
    const variant = enc.urlEncode(`${shopifyVariantGID}${variantID}`)

    // Build the cart line item
    const newItem = [
      {
        variantId: variant,
        quantity: quantity,
        customAttributes: attributes,
      },
    ]

    // Add it to the Shopify checkout cart
    const newCheckout = await shopifyClient.checkout.addLineItems(
      checkout.id,
      newItem
    )

    // Update our global store states
    setCheckoutState(newCheckout, setContext, true)
  }

  return addItem
}

// Update item in cart
function useUpdateItem() {
  const {
    context: { checkout, shopifyClient },
    setContext,
  } = useContext(SiteContext)

  async function updateItem(itemID: string | number, quantity: number) {
    // Bail if no ID or quantity given
    if (!itemID || !quantity || !checkout.id || !shopifyClient) return

    // Otherwise, start adding the product
    setContext((prevState) => {
      return { ...prevState, isUpdating: true }
    })

    const newCheckout = await shopifyClient.checkout.updateLineItems(
      checkout.id,
      [{ id: itemID, quantity: quantity }]
    )

    setCheckoutState(newCheckout, setContext)
  }
  return updateItem
}

// Remove item from cart
function useRemoveItem() {
  const {
    context: { checkout, shopifyClient },
    setContext,
  } = useContext(SiteContext)

  async function removeItem(itemID: string | number) {
    // Bail if no ID given
    if (!itemID || !shopifyClient) return

    // Otherwise, start removing the product
    setContext((prevState) => {
      return { ...prevState, isUpdating: true }
    })

    if (!checkout.id) return
    const newCheckout = await shopifyClient.checkout.removeLineItems(
      checkout.id,
      [itemID + '']
    )

    setCheckoutState(newCheckout, setContext)
  }
  return removeItem
}

export { useCartItems, useAddItem, useUpdateItem, useRemoveItem }
