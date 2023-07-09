import React from 'react'
import Section from '../../components/Section'
import PostCard from './PostCard'
import { PostCardResult } from './PostQueries'

type PostGalleryProps = {
  items: PostCardResult[]
}

const PostGallery: React.FC<PostGalleryProps> = (props) => {
  const { items } = props

  return (
    <div>
      <Section type="medium-wide" className="my-16">
        {[items.map((item) => <PostCard key={item.slug} {...item} />)]}
      </Section>
    </div>
  )
}

export default PostGallery
