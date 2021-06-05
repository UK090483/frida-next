import { usePreviewSubscription } from '@lib/sanity'
import { useRouter } from 'next/router'

type usePageProps = {
  slug: string
  query: string
  data: any
  preview: boolean | undefined
}

export const usePage = (props: usePageProps) => {
  const { slug, query, data, preview } = props

  const router = useRouter()

  const { data: pageData } = usePreviewSubscription(query, {
    params: { slug },
    initialData: data,
    enabled: !!preview,
  })

  if (router.isFallback) {
    return { pageData: null, isError: true }
  }
  if (!pageData) {
    return { pageData: null, isError: true }
  }

  if (preview) {
    pageData.site = data.site
  }

  return { pageData, isError: false }
}
