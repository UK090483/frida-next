import Layout from '@components/generic/layout/layout'
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

type ProductTemplateProps = {
  data: ProductSingleViewResult | null
  lang: FridaLocation
  slug: any
}

const query = `
*[_type == "product" && slug.current == $slug][0]{
  ${productSingleViewQuery},
  
}
`

const ProductTemplate: React.FC<ProductTemplateProps> = (props) => {
  const { data, lang, slug } = props
  const { pageData, isError } = usePage({ slug, query, data })

  if (isError) return <Error />

  return (
    <div>
      <Layout
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

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  return await handleStaticProps({ params, locale, query })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('product')
}

export default ProductTemplate
