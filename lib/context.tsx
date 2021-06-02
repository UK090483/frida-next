import React, { createContext, useContext, useEffect, useState } from 'react'
import { Base64 } from 'base64-string'

// get our API clients (shopify + sanity)
import { getSanityClient } from '@lib/sanity'
import shopify from '@lib/shopify'

// get our global image GROQ
import { imageMeta } from '@lib/api'
import { ImageMetaResult } from './queries/snippets'

// Set our initial context states

interface LineItem extends Partial<FetchVariantResult> {
  lineID: string | number
  quantity: number
}

type SiteContextState = {
  meganav: {
    isOpen: boolean
    activeID: string | null
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
    productCounts: [],
    shopifyClient: shopify,
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
  return context.shopifyClient?.checkout.create()
}

// Get Shopify checkout cart
const fetchCheckout = (context: SiteContextState, id: string) => {
  return context.shopifyClient?.checkout.fetch(id)
}

// get associated variant from Sanity

export type FetchVariantResult = {
  lineID: string | number
  _type: 'artwork' | 'productVariant'
  product: {
    title: string | null
    slug: string | null
    subTitle: string | null
  }
  id: string
  title: string
  price: number
  quantity: number
  photos: {
    default: null | ImageMetaResult[]
    cart: { forOption: string; photos: null | ImageMetaResult[] }[] | null
    listingPhotos: { listingPhoto: null | ImageMetaResult }[]
  }
  options: { name: string; position: number; value: string }
}
const fetchVariant = async (id: string) => {
  const variant = (await getSanityClient().fetch(
    `
      *[_type == "productVariant" && variantID == ${id}][0]{
        _type,
        "product": *[_type == "product" && productID == ^.productID][0]{
          title,
          "slug": slug.current,
          galleryPhotos[]{
            forOption,
            photos[]{
              ${imageMeta}
            }
          },
          listingPhotos[]{
            listingPhoto {${imageMeta}}
          },
        },
        "id": variantID,
        title,
        price,
       
        "photos": {
          'default':*[_type == "product" && productID == ^.productID][0].listingPhotos[].listingPhoto{
            ${imageMeta}
          },
          "cart": *[_type == "product" && productID == ^.productID][0].cartPhotos[]{
            forOption,
            "default": cartPhoto{
              ${imageMeta}
            },
          },
          "listingPhotos": *[_type == "product" && productID == ^.productID][0].listingPhotos[]{
            ${imageMeta}
          },
          
        },
        options[]{
          name,
          position,
          value
        }
      }
    `
  )) as FetchVariantResult | null

  return variant
}

const fetchArtwork = async (id: string) => {
  const variant = (await getSanityClient().fetch(
    `
      *[_type == "artwork" && shopify_variant_id == '${id}'][0]{
        _type,
        'product':{
          
          "slug": slug.current,
          'title' :name,
          'subTitle' : artist->anzeigeName
        },
       
        'id': shopify_variant_id,
        price,
        
        "photos":{
          'default': [image{${imageMeta}}],
        },
        
      }
    `
  )) as FetchVariantResult | null

  return variant
}

// set Shopify variables
const shopifyCheckoutID = 'shopify_checkout_id'
const shopifyVariantGID = 'gid://shopify/ProductVariant/'

// set our checkout states
const setCheckoutState = async (
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

  // update state
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

// Toggle Mega Navigation states
function useToggleMegaNav() {
  const {
    context: { meganav },
    setContext,
  } = useContext(SiteContext)

  async function toggleMegaNav(state: 'toggle', id = null) {
    setContext((prevState) => {
      return {
        ...prevState,
        meganav: {
          isOpen: state === 'toggle' ? !meganav.isOpen : state,
          activeID: state === 'toggle' && meganav.isOpen ? null : id,
        },
      }
    })
  }
  return toggleMegaNav
}

/*  ------------------------------ */
/*  Our Shopify context helpers
/*  ------------------------------ */

// Access our cart item count
function useCartCount() {
  const {
    context: { checkout },
  } = useContext(SiteContext)

  let count = 0

  if (checkout.lineItems) {
    count = checkout.lineItems.reduce((total, item) => item.quantity + total, 0)
  }

  return count
}

// Access our cart totals
function useCartTotals() {
  const {
    context: { checkout },
  } = useContext(SiteContext)

  const subTotal = checkout.subTotal ? checkout.subTotal.amount * 100 : false
  return {
    subTotal,
  }
}

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

// Build our Checkout URL
function useCheckout() {
  const {
    context: { checkout },
  } = useContext(SiteContext)

  return checkout.webUrl
}

// Toggle cart state
function useToggleCart() {
  const {
    context: { isCartOpen },
    setContext,
  } = useContext(SiteContext)

  async function toggleCart() {
    setContext((prevState) => {
      return { ...prevState, isCartOpen: !isCartOpen }
    })
  }
  return toggleCart
}

// Reference a collection product count
// function useProductCount() {
//   const {
//     context: { productCounts },
//   } = useContext(SiteContext)

//   function productCount(collection) {
//     const collectionItem = productCounts.find((c) => c.slug === collection)
//     return collectionItem.count
//   }

//   return productCount
// }

export {
  SiteContextProvider,
  useSiteContext,
  useToggleMegaNav,
  useCartCount,
  useCartTotals,
  useCartItems,
  useAddItem,
  useUpdateItem,
  useRemoveItem,
  useCheckout,
  useToggleCart,
  //  useProductCount,
}
