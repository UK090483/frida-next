import React from 'react'

import PostGallery from 'contentTypes/Post/PostGallery'
import { FridaLocation } from 'types'
import { postCardQuery, PostCardResult } from 'contentTypes/Post/PostCard'
import { PageBuilderBlockBase } from '../pageBuilderQueries'

export const postsBlockQuery = `
_type == "posts" => {
  'items': *[_type == 'post']{
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
