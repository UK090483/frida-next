import PostSingle from 'contentTypes/Post/PostSingle'
import { getAllDocSlugs } from '@lib/api'
import { getPostPage, PostPageResult } from '@lib/queries/postQueries'
import Error from '@pages/404'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { FridaLocation } from 'types'

type PostTemplateProps = {
  data: PostPageResult
  lang: FridaLocation
}

const ArtworkTemplate: React.FC<PostTemplateProps> = (props) => {
  const { data, lang } = props
  const { title, title_en, categories } = data
  const router = useRouter()

  if (!router.isFallback && !data) {
    return <Error />
  }

  return <div>{!router.isFallback && <PostSingle lang={lang} {...data} />}</div>
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
  previewData,
  locale,
}) => {
  if (!params?.slug) return { notFound: true }

  //@ts-ignore
  const pageData = await getPostPage(params.slug.join('/'), {
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
  let allPages = await getAllDocSlugs('post')
  if (!allPages) return { paths: [], fallback: true }

  return {
    paths:
      allPages.reduce((acc, page) => {
        if (!page.slug) return [...acc]
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
