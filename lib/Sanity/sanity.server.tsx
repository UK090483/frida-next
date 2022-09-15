import createClient from '@sanity/client'
import { config } from './config'

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export function createPreviewClient(token: string) {
  return createClient({
    ...config,
    useCdn: false,
    token,
  })
}

// Helper function for easily switching between normal client and preview client
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
