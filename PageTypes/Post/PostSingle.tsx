import Layout from '@components/generic/Layout'

import { SiteResult } from '@lib/queries/cache'
import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'
import { ImageMetaResult, imageMeta } from '@lib/queries/snippets'
import BodyParser from 'pageBuilder/BodyParser'
import React from 'react'
import { FridaLocation } from 'types'
import Photo from '@components/Photo'

import CarouselHeroItem from '@components/CarouselHero/CarouselItem'

export const postSingleView = `
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
${body}
'site':'getSite'
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
  lang: FridaLocation
  preview?: boolean
}

const PostSingle: React.FC<PostSingleProps> = (props) => {
  const {
    headerImage,
    content,
    lang,
    title,
    title_en,
    site,
    default_header,
    preview = false,
    categories,
  } = props

  const _headerTitle =
    categories && categories[0]
      ? lang === 'en'
        ? categories[0].title_en
        : categories[0].title
      : 'Frida'

  const _title = lang === 'en' && title_en ? title_en : title

  return (
    <>
      <Layout
        preview={preview}
        lang={lang}
        initialColor="pink"
        title={_headerTitle}
        navItems={site?.navigation?.items}
        data={props}
      >
        {default_header !== false && (
          <CarouselHeroItem
            color={'pink'}
            image={<Photo photo={headerImage} layout="fill" />}
            content={<h1 className="pb-10 header-small">{_title}</h1>}
          />
        )}
        {content && <BodyParser lang={lang} content={content} />}
      </Layout>
    </>
  )
}

export default PostSingle
