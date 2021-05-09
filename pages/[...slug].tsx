import React from 'react'
import { useRouter } from 'next/router'
import Error from '@pages/404'
import Modal from 'react-modal'
import { getAllDocSlugs } from '@lib/api'
import { getPage } from '@lib/queries/pageQueries'
import PageBuilder from 'pageBuilder/Page'
import { useContextualRouting } from 'next-use-contextual-routing'
import { GetStaticProps, GetStaticPaths } from 'next'
import { FridaLocation } from 'types'

const { CONFIG_BUILD_ID } = process.env
import useSWR from 'swr'
import Link from 'next/link'
import Header from '@components/generic/header/Header'
import Icon from '@components/lib/Icon'
import ArtworkSingle from '@components/ArtworkSingle'

type PageProps = {
  data: any
  lang: FridaLocation
}

const Page: React.FC<PageProps> = ({ data, lang }) => {
  const router = useRouter()
  if (!router.isFallback && !data) {
    return <Error />
  }

  return (
    <div className="relative">
      {!router.isFallback && <PageBuilder lang={lang} data={data} />}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
  previewData,
  locale,
}) => {
  //@ts-ignore
  const pageData = await getPage(params.slug.join('/'), {
    active: preview, //@ts-ignore
    token: previewData?.token,
  })

  return {
    props: {
      data: pageData,
      lang: locale,
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
