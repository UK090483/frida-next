import { handleStaticPropsResult } from '@lib/queries/handleStaticProps'
import { usePage } from '@lib/queries/usePage'

import Error from '@pages/404'
import React from 'react'

const PageType = <T extends unknown>(
  props: handleStaticPropsResult<T> & {
    children: (data: T) => React.ReactElement
  }
) => {
  const { data, slug, previewQuery, children } = props
  const { pageData, isError } = usePage({ slug, query: previewQuery, data })
  if (!pageData || isError) return <Error />
  return children(pageData)
}
export default PageType
