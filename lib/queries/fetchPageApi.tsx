import { getSanityClient } from '@lib/sanity.server'
import type { FridaPreviewData } from '@pages/api/preview'

export const fetchPageWithCache = async (
  query: string,
  slug: string,
  preview: boolean,
  previewData?: FridaPreviewData,
  locale?: string
) => {
  if (preview) {
    console.log('preview Active')
  }

  if (preview && (!previewData || !previewData?.token)) {
    console.log('preview token is missing')
  }

  console.time('fetchPage_ ' + slug)
  const pageData = await getSanityClient({
    active: !!preview,
    token: previewData?.token,
  }).fetch(query, { locale, slug: slug })
  console.timeEnd('fetchPage_ ' + slug)

  return pageData
}
