import React from 'react'
import Link from 'next/link'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import { FridaLocation } from 'types'
import { ImageMetaResult, imageMeta } from '@lib/queries/snippets'
import Photo from '@components/Photo'

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
    title_en,
    lang,
    categories,
    categories_en,
    createdAt,
  } = props

  if (!previewImage) return null

  const _title = lang === 'en' && title_en ? title_en : title
  // const _excerpt = lang === 'en' && excerpt_en ? excerpt_en : excerpt
  const _categories =
    lang === 'en' && categories_en ? categories_en : categories

  return (
    <Link href={`/post/${slug}`} passHref>
      <a
        {...mouseLinkProps}
        className="p-2 flex flex-wrap-reverse md:flex-nowrap justify-between  w-full  mb-16"
      >
        <div className="w-full md:w-2/3 mt-4 md:mt-0 md:pr-frida_7% flex flex-col justify-between ">
          <h2 className="header-small">{_title}</h2>
          <Infos categories={_categories} createdAt={createdAt} />
        </div>

        <div className=" relative w-full md:w-96 h-80 mx-auto">
          <Photo photo={previewImage} layout="fill" />
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
        <div
          key={cat}
          className="text-xs-fluid inline-block border-2 px-8 py-1 rounded-full mr-3"
        >
          {cat}
        </div>
      ))}
      <div className="text-xs-fluid">{formatDate(createdAt)}</div>
    </div>
  )
}

const formatDate = (date: null | string) => {
  if (!date) return ''
  const _date = new Date(date)
  const f = new Intl.DateTimeFormat('en')
  const d = f.format(_date).split('/')

  return `${d[1]} / ${d[0]} / ${d[2]}`
}
