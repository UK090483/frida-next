import { handleStaticPropsResult } from 'pageBuilder/queries/handleStaticProps'
import { usePage } from 'hooks/usePage'
import Error from '@pages/404'
import React from 'react'
import { LayoutContextProvider } from './Layout/LayoutContext'

const PageType = <T extends unknown>(
  props: handleStaticPropsResult<T> & {
    children: (data: T) => React.ReactElement
  }
) => {
  const { data, slug, previewQuery, children } = props
  const { pageData, isError } = usePage({ slug, query: previewQuery, data })
  if (!pageData || isError) return <Error />

  return (
    //@ts-ignore
    <LayoutContextProvider data={pageData?.layout}>
      {children(pageData)}
    </LayoutContextProvider>
  )
}
export default PageType
