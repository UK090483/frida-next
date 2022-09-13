import Layout from 'pageBuilder/Layout/Layout'

import { SiteResult } from '@lib/queries/cache'
import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'
import { ImageMetaResult, imageMeta } from '@lib/queries/snippets'
import BodyParser from 'pageBuilder/BodyParser'
import React from 'react'
import Photo from '@components/Photo'

import CarouselHeroItem from '@components/CarouselHero/CarouselItem'
import { layoutQuery } from 'pageBuilder/Layout/layoutQuery'
import { useRouter } from 'next/router'

export const postSingleView = (locale = '') => `
...,
title,
title_en,
'createdAt':_createdAt,
'categories':categories[]->{title,title_en},
'slug':slug.current,
excerpt,
excerpt_en,
'headerImage': headerImage {${imageMeta}},
'previewImage':previewImage {${imageMeta}},
${body(locale)}
${layoutQuery(locale)}
`

export type PostPageResult = {
  slug: string
  title: string
  title_en: string | null
  excerpt: string | null
  excerpt_en: string | null
  categories: null | { title_en: string; title: string }[]
  createdAt: null | string
  headerImage: ImageMetaResult
  previewImage: ImageMetaResult | null
  content: null | PageBodyResult
  default_header?: null | boolean
  site: SiteResult
}

interface PostSingleProps extends PostPageResult {
  preview?: boolean
}

const PostSingle: React.FC<PostSingleProps> = (props) => {
  const {
    headerImage,
    content,

    title,
    title_en,
    default_header,
    categories,
  } = props

  const { locale } = useRouter()

  const _headerTitle =
    categories && categories[0]
      ? locale === 'en'
        ? categories[0].title_en
        : categories[0].title
      : 'Frida'

  const _title = locale === 'en' && title_en ? title_en : title

  return (
    <>
      <Layout initialColor="pink" title={_headerTitle}>
        {default_header !== false && (
          <CarouselHeroItem
            color={'pink'}
            image={<Photo photo={headerImage} layout="fill" />}
            content={<h1 className="pb-10 header-small">{_title}</h1>}
          />
        )}
        {content && <BodyParser content={content} />}
      </Layout>
    </>
  )
}

export default PostSingle
