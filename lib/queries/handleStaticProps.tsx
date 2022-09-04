import type { FridaPreviewData } from 'pages/api/preview'
import type { ParsedUrlQuery } from 'querystring'
import type { FridaLocation } from 'types'
import { fetchPageWithCache } from './fetchPageApi'

type handleStaticPropsProps = {
  params?: ParsedUrlQuery | undefined
  locale?: string | undefined
  query: string
  preview?: boolean | undefined
  previewData?: any
}

type FailedResult = {
  notFound: true
}
type SuccessResult = {
  props: {
    slug?: string | null
    lang?: string | null
    data: unknown
    preview: boolean
  }
}

export type TemplateProps<R> = {
  data: R | null
  lang: FridaLocation
  preview: boolean
  slug: string
}

export const handleStaticProps: (
  props: handleStaticPropsProps
) => Promise<FailedResult | SuccessResult> = async (props) => {
  const { params, locale, query, preview = false, previewData } = props

  if (!params || !params.slug) {
    return {
      notFound: true,
    }
  }
  const slug =
    typeof params.slug === 'string' ? params.slug : params.slug.join('')

  const pageData = await fetchPageWithCache(
    query,
    slug,
    preview,
    previewData as FridaPreviewData
  )

  return {
    props: {
      preview,
      slug: slug || null,
      data: pageData || null,
      lang: locale || null,
    },
    revalidate: 1,
  }
}
