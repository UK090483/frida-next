import Layout from '@components/generic/Layout'

import { SiteResult } from '@lib/queries/cache'
import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'
import { ImageMetaResult, imageMeta } from '@lib/queries/snippets'
import BodyParser from 'pageBuilder/BodyParser'
import React from 'react'
import { FridaLocation } from 'types'
import Photo from '@components/Photo'

export const postSingleView = `
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
        <div data-color="pink" className="flex h-vh flex-wrap  bg-frida-pink">
          <div className="w-full  md:w-1/2 flex justify-center items-center p-20 mt-28">
            <h1 className="header-small pb-10">{_title}</h1>
          </div>

          <div className="relative w-full  md:w-1/2">
            <Photo photo={headerImage} layout="fill" />
          </div>
        </div>

        {content && <BodyParser lang={lang} content={content} />}
      </Layout>
    </>
  )
}

export default PostSingle
