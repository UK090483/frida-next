import React from 'react'
import Link from 'next/link'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import { FridaLocation } from 'types'

import Photo from '@components/Photo'
import type { PostCardResult } from './PostQueries'

interface PostCardProps extends PostCardResult {
  lang: FridaLocation
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const {
    headerImage,
    previewImage,
    slug,
    title,
    title_en,
    lang,
    categories,
    categories_en,
    createdAt,
    excerpt,
    excerpt_en,
    releaseDate,
  } = props

  const _prevImage = previewImage ? previewImage : headerImage

  if (!_prevImage) return null

  const _title = lang === 'en' && title_en ? title_en : title
  const _excerpt = lang === 'en' && excerpt_en ? excerpt_en : excerpt

  const _categories =
    lang === 'en' && categories_en ? categories_en : categories

  return (
    <Link href={`/post/${slug}`} passHref>
      <a
        {...mouseLinkProps}
        className=" flex  flex-wrap-reverse max-w-xl lg:max-w-full mx-auto  lg:flex-nowrap justify-between  w-full mb-8  md:mb-16"
      >
        <div className="w-full md:w-2/3 mt-4 lg:mt-0 md:pr-frida_7% flex flex-col   ">
          <Infos
            categories={_categories}
            createdAt={releaseDate || createdAt}
          />
          <div>
            <h2 className="header-small pb-0">{_title}</h2>
            <h3 className="text-sm-fluid opacity-50">{_excerpt}</h3>
          </div>
        </div>

        <div className="relative w-full lg:w-1/3  aspect-h-9  ">
          <div className="aspect-h-10 aspect-w-16 ">
            <Photo photo={_prevImage} layout="fill" />
          </div>
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
  return (
    <div className="mb-3 flex items-center">
      {categories &&
        categories.map((cat) => (
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
