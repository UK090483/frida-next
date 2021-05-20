import { getAllDocSlugs } from '@lib/api'
import { extraData, getPage, PageResult } from '@lib/queries/pageQueries'
import Error from '@pages/404'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import PageBuilder from 'contentTypes/Page/Page'
import React from 'react'
import { FridaLocation } from 'types'
import { usePreviewSubscription } from '@lib/sanity'
import { page as pageQuery } from '@lib/queries/pageQueries'

type PageProps = {
  data: PageResult | null
  lang: FridaLocation
  preview: boolean
  slug: string
}

const query = `*[_type == "page" && slug.current == $slug][0]{
  ${pageQuery}
}`

const Page: React.FC<PageProps> = ({ data, lang, preview, slug }) => {
  const router = useRouter()
  if (router.isFallback || !data) {
    return <Error />
  }

  // const { data: pageData } = usePreviewSubscription(query, {
  //   //@ts-ignore
  //   params: { slug: slug.join('/') },
  //   initialData: data,
  //   enabled: preview || router.query.preview !== null,

  // })

  return <PageBuilder lang={lang} data={data} />
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
  locale,
}) => {
  //@ts-ignore
  const { slug } = params
  //@ts-ignore
  const pageData = await getPage(params.slug.join('/'), {
    active: preview, //@ts-ignore
    token: previewData?.token,
  })

  const widthExtraData = await extraData(pageData)
  return {
    props: {
      slug,
      data: widthExtraData,
      lang: locale,
      preview: slug,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let allPages = await getAllDocSlugs('page')

  if (!allPages) return { paths: [], fallback: true }

  return {
    paths:
      allPages.reduce((acc, page) => {
        let slugs = page.slug.split('/').filter((e) => e)

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

export default Page
