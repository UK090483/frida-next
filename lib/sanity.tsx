import createSanityClient from '@sanity/client'
import sanityImage from '@sanity/image-url'
import { ClientConfig, createPreviewSubscriptionHook } from 'next-sanity'

const options: ClientConfig = {
  //@ts-ignore
  dataset: process.env.SANITY_PROJECT_DATASET,
  //@ts-ignore
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',

  apiVersion: '2021-03-25',
}

export const sanityClient = createSanityClient(options)
export const imageBuilder = sanityImage(sanityClient)

export function createPreviewClient(token: string) {
  return createSanityClient({
    ...options,
    useCdn: false,
    token,
  })
}

export const usePreviewSubscription = createPreviewSubscriptionHook(options)

export function getSanityClient(preview?: {
  active: boolean
  token: string | undefined
}) {
  if (preview?.active && preview.token) {
    return createPreviewClient(preview.token)
  } else {
    return sanityClient
  }
}
