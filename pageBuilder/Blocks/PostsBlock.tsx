import React from 'react'

import PostGallery from 'PageTypes/Post/PostGallery'
import { FridaLocation } from 'types'

import { PageBuilderBlockBase } from '../pageBuilderQueries'
import { postCardQuery, PostCardResult } from 'PageTypes/Post/PostQueries'

export const postsBlockQuery = `
_type == "posts" => {
  'items': *[_type == 'post'] | order(releaseDate desc){
    ${postCardQuery}
  }
}
`
export interface PostsGalleryResult extends PageBuilderBlockBase {
  _type: 'posts'
  items: PostCardResult[]
}

type PostsBlockProps = {
  items: PostCardResult[]
  lang: FridaLocation
}

const PostsBlock: React.FC<PostsBlockProps> = (props) => {
  const { items = [], lang } = props

  return <PostGallery items={items} lang={lang} />
}

export default PostsBlock
