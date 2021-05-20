import ArtworkSingle from 'contentTypes/Artwork/ArtworkSingle/ArtworkSingle'
import Layout from '@components/generic/layout/layout'
import { getAllDocSlugs } from '@lib/api'
import {
  artworkSingleViewQuery,
  ArtworkSingleViewResult,
  getArtworkPage,
} from '@lib/queries/artworksQueries'
import Error from '@pages/404'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { FridaLocation } from 'types'
import { usePreviewSubscription } from '@lib/sanity'

type ArtworkTemplateProps = {
  data: ArtworkSingleViewResult | null
  lang: FridaLocation
  preview: boolean
  slug: any
}

const query = `*[_type == "artwork" && slug.current == $slug][0]{
  ${artworkSingleViewQuery}
}`

const ArtworkTemplate: React.FC<ArtworkTemplateProps> = (props) => {
  const { data, lang, preview, slug } = props

  const router = useRouter()

  if (router.isFallback) {
    return <Error />
  }
  if (!data) {
    return <Error />
  }

  const { data: pageData } = usePreviewSubscription(query, {
    // @ts-ignore
    params: { slug: slug.join('/') },
    initialData: data,
    enabled: preview || router.query.preview !== null,
  })

  return (
    <div>
      {!router.isFallback && (
        <Layout
          title={props.data?.artwork.artistName || 'Frida'}
          navItems={data.site.navigation.items}
          data={pageData}
        >
          <ArtworkSingle lang={lang} {...pageData}>
            Artwork
          </ArtworkSingle>
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
      preview: preview || false,
      slug: params?.slug,
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
