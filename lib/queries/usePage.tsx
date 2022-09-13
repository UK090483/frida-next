import { usePreviewSubscription } from '@lib/sanity'
import { useRouter } from 'next/router'

type usePageProps = {
  slug: string
  query: string
  data: any
}

export const usePage = (props: usePageProps) => {
  const { slug, query, data } = props

  const { isFallback, isPreview } = useRouter()

  const { data: pageData } = usePreviewSubscription(query, {
    params: { slug },
    initialData: data,
    enabled: isPreview,
  })

  if (isFallback) {
    return { pageData: null, isError: true }
  }
  if (!pageData) {
    return { pageData: null, isError: true }
  }

  if (isPreview) {
    pageData.site = data.site
  }

  return { pageData, isError: false }
}
