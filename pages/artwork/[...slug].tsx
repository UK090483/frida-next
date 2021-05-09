import ArtworkSingle from '@components/ArtworkSingle'
import Layout from '@components/generic/layout/layout'
import { getAllDocSlugs } from '@lib/api'
import { getArtworkPage } from '@lib/queries/artworksQueries'
import Error from '@pages/404'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { FaTable } from 'react-icons/fa'
import { FridaLocation } from 'types'

type ArtworkTemplateProps = {
  data: any
  lang: FridaLocation
}

const ArtworkTemplate: React.FC<ArtworkTemplateProps> = (props) => {
  const { data, lang } = props

  const router = useRouter()

  if (!router.isFallback && !data) {
    return <Error />
  }

  return (
    <div>
      {!router.isFallback && (
        <Layout
          title={props.data?.artwork?.artistName}
          navItems={data?.site?.navigation?.items}
          data={data}
        >
          <ArtworkSingle {...data}>Artwork</ArtworkSingle>
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
  const pageData = await getArtworkPage(params.slug.join('/'), {
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
  let allPages = await getAllDocSlugs('artwork')
  if (!allPages) return { paths: [], fallback: true }

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

export default ArtworkTemplate
