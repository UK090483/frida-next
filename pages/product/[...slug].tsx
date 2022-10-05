import Layout from 'pageBuilder/Layout/Layout'
import { usePage } from 'hooks/usePage'
import { getAllDocPathsCached } from 'pageBuilder/queries/fetchDocPathApi'
import {
  handleStaticProps,
  handleStaticPropsResult,
} from 'pageBuilder/queries/handleStaticProps'
import Error from 'pages/404'
import {
  productSingleViewQuery,
  ProductSingleViewResult,
} from 'PageTypes/Product/ProductSingle.query'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

import { FridaPreviewData } from '@pages/api/preview'
import ProductSingle from 'PageTypes/Product/ProductSingle'

const query = (locale: string) => `
*[_type == "product" && slug.current == $slug][0]{
  ${productSingleViewQuery(locale)}
}
`

const ProductTemplate: React.FC<
  handleStaticPropsResult<ProductSingleViewResult>
> = (props) => {
  const { data, slug, previewQuery } = props
  const { pageData, isError } = usePage<ProductSingleViewResult>({
    slug,
    query: previewQuery,
    data,
  })

  if (!pageData || isError) return <Error />

  return (
    <Layout>
      <ProductSingle {...pageData} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (props) => {
  const { preview, previewData, params, locale } = props
  const _previewData = previewData as FridaPreviewData

  return await handleStaticProps({
    params,
    locale,
    query,
    preview: preview || false,
    previewData: _previewData,
  })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('product')
}

export default ProductTemplate
