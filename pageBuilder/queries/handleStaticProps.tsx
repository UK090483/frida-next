import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import type { FridaPreviewData } from 'pages/api/preview'
import { fetchPageWithCache } from './fetchPageApi'

// type handleStaticPropsProps = {
//   params?: ParsedUrlQuery | undefined
//   locale?: string | undefined
//   query: string
//   preview?: boolean | undefined
//   previewData?: any
// }

interface handleStaticPropsProps extends GetStaticPropsContext {
  query: (locale: string) => string
}

export type handleStaticPropsResult<T> = {
  data: T
  slug: string
  previewQuery: string
}

async function handleStaticProps<T>(
  props: handleStaticPropsProps
): Promise<GetStaticPropsResult<handleStaticPropsResult<T>>> {
  const { params, query, preview = false, previewData, locale } = props

  if (!params || !params.slug) {
    return {
      notFound: true,
    }
  }
  const slug =
    typeof params.slug === 'string' ? params.slug : params.slug.join('')

  const pageData = await fetchPageWithCache(
    query(locale || ''),
    slug,
    preview,
    previewData as FridaPreviewData,
    locale
  )

  if (!pageData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      slug: slug,
      data: pageData,
      previewQuery: preview ? query(locale || '') : '',
    },
    revalidate: 1,
  }
}

export { handleStaticProps }
