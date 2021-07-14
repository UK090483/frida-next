import React, { createContext, useContext, useEffect, useState } from 'react'
import { Base64 } from 'base64-string'
import {
  FetchVariantResult,
  fetchVariant,
  fetchArtwork,
  checkIfCookieExcepted,
} from './helper'

interface LineItem extends Partial<FetchVariantResult> {
  lineID: string | number
  quantity: number
}

type SiteContextState = {
  meganav: {
    isOpen: boolean
    activeID: string | null
  }
  cookie: {
    declined: boolean
    accepted: boolean
  }
  productCounts: number[] | string | null
  shopifyClient: ShopifyBuy.Client | null
  isLoading: boolean
  isAdding: boolean
  isUpdating: boolean
  isCartOpen: boolean
  checkout: {
    id: null | string | number
    lineItems: LineItem[]
    webUrl: string | null
    subTotal: any
  }
}

type SiteContext = {
  context: SiteContextState
  setContext: React.Dispatch<React.SetStateAction<SiteContextState>>
}

const initialContext: SiteContext = {
  context: {
    meganav: {
      isOpen: false,
      activeID: null,
    },
    cookie: {
      declined: false,
      accepted: checkIfCookieExcepted(),
    },
    productCounts: [],
    shopifyClient: (await import('@lib/shopify')).default,
    isLoading: true,
    isAdding: false,
    isUpdating: false,
    isCartOpen: false,
    checkout: {
      id: null,
      lineItems: [],
      webUrl: null,
      subTotal: null,
    },
  },
  setContext: () => null,
}

// Set context
export const SiteContext = createContext(initialContext)

// Build a new checkout
const createNewCheckout = (context: SiteContextState) => {
  console.log(context.shopifyClient)
  return context.shopifyClient?.checkout.create()
}

// Get Shopify checkout cart
const fetchCheckout = (context: SiteContextState, id: string) => {
  return context.shopifyClient?.checkout.fetch(id)
}

// set Shopify variables
export const shopifyCheckoutID = 'shopify_checkout_id'
export const shopifyVariantGID = 'gid://shopify/ProductVariant/'

// set our checkout states
export const setCheckoutState = async (
  checkout: ShopifyBuy.Cart | undefined,
  setContext: SiteContext['setContext'],
  openCart?: boolean
) => {
  if (!checkout) return null

  if (typeof window !== `undefined`) {
    localStorage.setItem(shopifyCheckoutID, checkout.id + '')
  }

  // get real lineItems data from Sanity
  const lineItems = await Promise.all(
    checkout.lineItems.map(async (item) => {
      const enc = new Base64()
      //@ts-ignore
      const variantID = enc.decode(item.variant.id).split(shopifyVariantGID)[1]
      let variant = await fetchVariant(variantID)
      if (!variant) {
        variant = await fetchArtwork(variantID)
      }

      return { ...variant, quantity: item.quantity, lineID: item.id }
    })
  )

  // update state return null
  setContext((prevState) => {
    return {
      ...prevState,
      isAdding: false,
      isLoading: false,
      isUpdating: false,

      isCartOpen: openCart ? true : prevState.isCartOpen,
      checkout: {
        ...prevState.checkout,
        id: checkout.id,
        lineItems: lineItems,
        //@ts-ignore
        subTotal: checkout.lineItemsSubtotalPrice as number,
        //@ts-ignore
        webUrl: checkout.webUrl as string,
      },
    }
  })
}

/*  ------------------------------ */
/*  Our Context Wrapper
/*  ------------------------------ */

const SiteContextProvider: React.FC<{
  data: { productCounts: null | string | number[] }
}> = ({ data, children }) => {
  const { productCounts } = data

  const [context, setContext] = useState<SiteContextState>({
    ...initialContext.context,
    ...{ productCounts },
  })

  const [initContext, setInitContext] = useState(false)

  useEffect(() => {
    // Shopify checkout not build yet
    if (initContext === false) {
      const initializeCheckout = async () => {
        const existingCheckoutID =
          typeof window !== 'undefined'
            ? localStorage.getItem(shopifyCheckoutID)
            : false

        // existing Shopify checkout ID found
        if (existingCheckoutID) {
          try {
            // fetch checkout from Shopify
            const existingCheckout = await fetchCheckout(
              context,
              existingCheckoutID
            )

            // Check if there are invalid items
            if (
              existingCheckout &&
              //@ts-ignore
              existingCheckout.lineItems.some((lineItem) => !lineItem.variant)
            ) {
              throw new Error(
                'Invalid item in checkout. This variant was probably deleted from Shopify.'
              )
            }

            // Make sure this cart hasn’t already been purchased.
            if (existingCheckout && !existingCheckout.completedAt) {
              setCheckoutState(existingCheckout, setContext)
              return
            }
          } catch (e) {
            //@ts-ignore
            localStorage.setItem(shopifyCheckoutID, null)
          }
        }

        // Otherwise, create a new checkout!
        const newCheckout = await createNewCheckout(context)
        setCheckoutState(newCheckout, setContext)
      }

      // Initialize the store context
      initializeCheckout()
      setInitContext(true)
    }
  }, [initContext, context, setContext, context.shopifyClient?.checkout])

  return (
    <SiteContext.Provider
      value={{
        context,
        setContext,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

// Access our global store states
function useSiteContext() {
  const { context } = useContext(SiteContext)
  return context
}

export { SiteContextProvider, useSiteContext }
