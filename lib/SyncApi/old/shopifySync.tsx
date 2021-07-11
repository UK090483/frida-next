// import axios, { AxiosRequestConfig } from 'axios'
// import { SanityClient } from '@sanity/client'
// import { getSanityArtworkCheckSum, SanityProduct } from './sanitySync'
// import { log } from '../logging'

// const shopifyConfig = {
//   'Content-Type': 'application/json',
//   'X-Shopify-Access-Token': process.env.SHOPIFY_API_PASSWORD,
// }

// export type ShopifyProduct = {
//   title: string
//   price?: number
//   handle?: string
//   body?: string
//   image?: string
//   id: string
//   variant_id: string
// }

// export type ShopifyArtworkData = {
//   title: string
//   price?: number
//   handle?: string
//   body?: string
//   image?: string
//   id: string
//   variant_id: string
// }
// export const createProduct = async (
//   product: SanityProduct,
//   s: SanityClient
// ) => {
//   log('info', `creating product ${product.name} `)

//   try {
//     const res = await fetchShopify(
//       'products.json',
//       {
//         product: {
//           title: product.name,
//           body_html: `<p>${product.description}</p>`,
//           vendor: 'frida',
//           product_type: 'artwork',
//           published_scope: 'global',
//           images: [
//             {
//               src: product.imageSrc,
//             },
//           ],
//           variants: [
//             {
//               inventory_quantity: product.availability === 'sold' ? 0 : 1,
//               inventory_management: 'shopify',
//               price: product.price,
//               requires_shipping: false,
//             },
//           ],
//         },
//       },
//       'POST'
//     )

//     if (!res) return null

//     if (res.data.product.id) {
//       await axios({
//         url: `https://${process.env.SHOPIFY_STORE_ID}.myshopify.com/admin/api/2021-04//product_listings/${res.data.product.id}.json`,
//         method: 'PUT',
//         headers: shopifyConfig,
//         data: {
//           product_listing: {
//             product_id: res.data.product.id,
//           },
//         },
//       })
//     }

//     await checkIfAvailable(res.data.product.id)

//     const { title, body_html, handle, variants, image, id } = res.data.product

//     return {
//       title: title,
//       body: body_html,
//       handle: handle,
//       price: variants[0].price,
//       image: image.src,
//       id: id + '',
//       variant_id: variants[0].id + '',
//     } as ShopifyProduct
//   } catch (error) {
//     console.log(
//       `Problems while creating Product ${product.name}, Error:${error}`
//     )
//     return null
//   }
// }

// export const updateShopifyProduct = async (product: SanityProduct) => {
//   try {
//     const res = await fetchShopify(
//       `products/${product.shopify_product_id}.json`,
//       {
//         product: {
//           title: product.name,
//           body_html: `<p>${product.description}</p>`,
//           vendor: 'frida',
//           product_type: 'artwork',
//           published_scope: 'global',
//           images: [
//             {
//               src: product.imageSrc,
//             },
//           ],
//           variants: [
//             {
//               inventory_quantity: product.availability === 'sold' ? 0 : 1,
//               inventory_management: 'shopify',
//               price: product.price,
//               requires_shipping: false,
//             },
//           ],
//         },
//       },
//       'PUT'
//     )
//   } catch (error) {}
// }

// export const getShopifyProduct: (
//   id: string,
//   count?: number
// ) => Promise<null | ShopifyProduct> = async (id, count) => {
//   try {
//     const res = await axios({
//       url: `https://${process.env.SHOPIFY_STORE_ID}.myshopify.com/admin/api/2021-04/products.json?ids=${id}`,
//       method: 'GET',
//       headers: shopifyConfig,
//     })

//     if (!res.data.products || !res.data.products[0]) {
//       if (!count || count > 5) return null
//       await waitSomeTime()
//       log('info', `retry ${count} shopify artwork fetch`)

//       return getShopifyProduct(id, count + 1)
//     }
//     const { title, body_html, handle, variants, image } = res.data.products[0]
//     return {
//       title: title,
//       body: body_html,
//       handle: handle,
//       price: variants[0].price,
//       image: image.src,
//       id: id + '',
//       variant_id: variants[0].id + '',
//     }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

// const fetchShopify = async (
//   path: string,
//   data: any,
//   method: AxiosRequestConfig['method']
// ) => {
//   try {
//     const res = await axios({
//       url: `https://${process.env.SHOPIFY_STORE_ID}.myshopify.com/admin/api/2021-04/${path}`,
//       method: method,
//       headers: shopifyConfig,
//       data,
//     })

//     return res
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

// const checkIfAvailable = async (id: string, count = 1) => {
//   log('info', `check ${count}`)
//   await waitSomeTime()
//   const product = await getShopifyProduct(id)
//   if (!product && count < 3) await checkIfAvailable(id, count + 1)

//   return !!product
// }

// export const waitSomeTime = (time = 1000) => {
//   log('info', `wait ${time / 1000}s`)
//   return new Promise<boolean>((resolve, reject) => {
//     setTimeout(() => {
//       log('info', `wait ${time / 1000}s done`)
//       resolve(true)
//     }, time)
//   })
// }

// export const getShopifyChecksum = async (id: string) => {
//   const res = await fetchShopify(
//     `products/${id}/metafields.json`,
//     undefined,
//     'GET'
//   )

//   if (!res?.data?.metafields) {
//     return null
//   }

//   const cS = res.data.metafields.find(
//     (item: any) => item.key === 'checksum_syncData'
//   )

//   if (!cS) {
//     log('error', 'unable to find Checksum')
//     return null
//   }
//   return cS.value as string
// }

// export const setShopifyChecksum = async (id: string, checksum: string) => {
//   log('info', 'set Checksum')
//   const res = await fetchShopify(
//     `products/${id}/metafields.json`,
//     {
//       metafield: {
//         key: 'checksum_syncData',
//         namespace: 'syncData',
//         value: checksum,
//         value_type: 'string',
//       },
//     },
//     'POST'
//   )
// }
export {}
