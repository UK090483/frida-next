import { usePreviewSubscription } from '@lib/sanity'
import { useRouter } from 'next/router'

type usePageProps = {
  slug: string
  query: string
  data: any
}

export const usePage = (props: usePageProps) => {
  const { slug, query, data } = props

  const router = useRouter()

  if (router.isFallback) {
    return { pageData: null, isError: true }
  }
  if (!data) {
    return { pageData: null, isError: true }
  }

  const { data: pageData } = usePreviewSubscription(query, {
    params: { slug },
    initialData: data,
    enabled: !!router.query.preview,
  })

  return { pageData, isError: false }
}
