import Layout from '@components/generic/Layout'
import { usePage } from '@lib/queries/usePage'
import { getAllDocPathsCached } from '@lib/queries/fetchDocPathApi'
import { handleStaticProps } from '@lib/queries/handleStaticProps'
import Error from '@pages/404'
import ProductSingle, {
  productSingleViewQuery,
  ProductSingleViewResult,
} from 'contentTypes/Product/ProductSingle'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { FridaLocation } from 'types'
import { FridaPreviewData } from '@pages/api/preview'

type ProductTemplateProps = {
  data: ProductSingleViewResult | null
  lang: FridaLocation
  slug: string
  preview: boolean | undefined
}

const query = `
*[_type == "product" && slug.current == $slug][0]{
  ${productSingleViewQuery},
  
}
`

const ProductTemplate: React.FC<ProductTemplateProps> = (props) => {
  const { data, lang, slug, preview } = props
  const { pageData, isError } = usePage({ slug, query, data, preview })

  if (isError) return <Error />

  return (
    <div>
      <Layout
        preview={preview || false}
        lang={lang}
        title={'Shop'}
        navItems={pageData.site.navigation.items}
        data={pageData}
      >
        <ProductSingle lang={lang} {...pageData} />
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
