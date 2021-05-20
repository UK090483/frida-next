import React from 'react'
import Link from 'next/link'
// import { PostCardResult } from '@lib/queries/snippets'
import FridaImage, {
  ARTWORK_IMAGE_PROPS,
} from '@components/fridaImage/FridaImage'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import { FridaLocation } from 'types'
import { useModalContext } from '@lib/modalContext'

import { ImageMetaResult, imageMeta } from '@lib/queries/snippets'

export const postCardQuery = `
'slug':slug.current,
title,
title_en,
excerpt,
excerpt_en,
'createdAt':_createdAt,
'categories':categories[]->title,
'categories_en':categories[]->title_en,
'headerImage': headerImage {${imageMeta}},
'previewImage':previewImage {${imageMeta}},
`
export type PostCardResult = {
  slug: string
  title: string
  title_en: string | null
  excerpt: string | null
  excerpt_en: string | null
  headerImage: ImageMetaResult
  previewImage: ImageMetaResult | null
  categories: null | string[]
  categories_en: null | string[]
  createdAt: null | string
}

interface PostCardProps extends PostCardResult {
  lang: FridaLocation
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const {
    previewImage,
    slug,
    title,
    excerpt,
    title_en,
    excerpt_en,
    lang,
    categories,
    categories_en,
    createdAt,
  } = props

  if (!previewImage) return null

  const _title = lang === 'en' && title_en ? title_en : title
  const _excerpt = lang === 'en' && excerpt_en ? excerpt_en : excerpt
  const _categories =
    lang === 'en' && categories_en ? categories_en : categories
  const { pushAsModal } = useModalContext()
  return (
    <Link href={`/post/${slug}`} passHref>
      <a
        {...mouseLinkProps}
        className=" px-20"
        onClick={(e) => {
          e.preventDefault()

          pushAsModal(`/post/${slug}`, 'post')
        }}
      >
        <div {...mouseLinkProps} className="flex mb-16 px-28">
          <div className="w-2/3 pr-40 flex flex-col justify-between ">
            <Infos categories={_categories} createdAt={createdAt} />
            <h2 className="header-small">{_title}</h2>
          </div>

          <FridaImage
            className="w-96 h-80"
            photo={previewImage}
            {...ARTWORK_IMAGE_PROPS}
            layout="fill"
          />
        </div>
      </a>
    </Link>
  )
}

export default PostCard

const Infos: React.FC<{
  categories: string[] | null
  createdAt: string | null
}> = ({ categories, createdAt }) => {
  if (!categories) return <></>
  return (
    <div className="mb-8 flex items-center">
      {categories.map((cat) => (
        <div className="text-sm-fluid inline-block border-2 px-8 py-1 rounded-full mr-3">
          {cat}
        </div>
      ))}
      <div className="text-sm-fluid">{formatDate(createdAt)}</div>
    </div>
  )
}

const formatDate = (date: null | string) => {
  if (!date) return ''
  const _date = new Date(date)
  const f = new Intl.DateTimeFormat('en')
  let d = f.format(_date).split('/')

  return `${d[1]} / ${d[0]} / ${d[2]}`
}
