import Layout from '@components/generic/layout/layout'
import { getAllDocSlugs } from '@lib/api'
import {
  ProductSingleViewResult,
  getProductPage,
} from '@lib/queries/productQueries'
import Error from '@pages/404'
import ProductSingle from 'contentTypes/Product/ProductSingle'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { FridaLocation } from 'types'

type ProductTemplateProps = {
  data: ProductSingleViewResult | null
  lang: FridaLocation
}

const ProductTemplate: React.FC<ProductTemplateProps> = (props) => {
  const { data, lang } = props

  const router = useRouter()

  if (router.isFallback) {
    return <Error />
  }
  if (!data) {
    return <Error />
  }

  return (
    <div>
      {!router.isFallback && (
        <Layout
          title={'Shop'}
          navItems={data.site.navigation.items}
          data={data}
        >
          <ProductSingle lang={lang} {...data} />
        </Layout>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
  previewData,
  locale,
}) => {
  if (!params?.slug) return { notFound: true }

  //@ts-ignore
  const pageData = await getProductPage(params.slug.join('/'), {
    active: preview, //@ts-ignore
    token: previewData?.token,
  })

  if (!params?.slug) return { notFound: true }

  return {
    props: {
      data: pageData,
      lang: locale,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let allPages = await getAllDocSlugs('product')
  if (!allPages) return { paths: [], fallback: true }
  console.log(allPages)
  return {
    paths:
      allPages?.reduce((acc, page) => {
        let slugs = page.slug.split('/').filter((e: string) => e)

        return [
          ...acc,
          {
            params: {
              slug: slugs,
            },
            locale: 'de',
          },
          {
            params: {
              slug: slugs,
            },
            locale: 'en',
          },
        ]
      }, [] as any[]) || [],
    fallback: false,
  }
}

export default ProductTemplate
