import React from 'react'

import PostGallery from 'PageTypes/Post/PostGallery'

import { PostCardResult } from 'PageTypes/Post/PostQueries'

type PostsBlockProps = {
  items: PostCardResult[]
}

const PostsBlock: React.FC<PostsBlockProps> = (props) => {
  const { items = [] } = props

  return <PostGallery items={items} />
}

export default PostsBlock
