import sanityImage from '@sanity/image-url'
import { createPreviewSubscriptionHook } from 'next-sanity'
import { config } from './config'
export const imageBuilder = sanityImage(config)
export const usePreviewSubscription = createPreviewSubscriptionHook(config)
