import Layout from 'pageBuilder/Layout/Layout'
import { usePage } from '@lib/queries/usePage'
import { getAllDocPathsCached } from '@lib/queries/fetchDocPathApi'
import {
  handleStaticProps,
  handleStaticPropsResult,
} from '@lib/queries/handleStaticProps'
import Error from 'pages/404'
import ProductSingle, {
  productSingleViewQuery,
  ProductSingleViewResult,
} from 'PageTypes/Product/ProductSingle'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

import { FridaPreviewData } from '@pages/api/preview'

const query = (locale: string) => `
*[_type == "product" && slug.current == $slug][0]{
  ${productSingleViewQuery(locale)},
  
}
`

const ProductTemplate: React.FC<
  handleStaticPropsResult<ProductSingleViewResult>
> = (props) => {
  const { data, slug, previewQuery } = props
  const { pageData, isError } = usePage({ slug, query: previewQuery, data })

  if (isError) return <Error />

  return (
    <div>
      <Layout title={'Shop'}>
        <ProductSingle {...pageData} />
      </Layout>
    </div>
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
