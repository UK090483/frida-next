import { usePreviewSubscription } from '@lib/sanity'
import { useRouter } from 'next/router'

type usePageProps<T extends any> = {
  slug: string
  query: string
  data: T
}

export function usePage<T extends any>(
  props: usePageProps<T>
): { pageData: T; isError: false } | { pageData: null; isError: true } {
  const { slug, query, data } = props

  const { isFallback, isPreview } = useRouter()

  const { data: pageData } = usePreviewSubscription<T>(query, {
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

  return { pageData, isError: false }
}
