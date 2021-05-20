import React from 'react'

import { FridaLocation } from 'types'
import Section from '../../components/container/section'
import PostCard, { PostCardResult } from './PostCard'

type PostGalleryProps = {
  items: PostCardResult[]
  lang: FridaLocation
}

const PostGallery: React.FC<PostGalleryProps> = (props) => {
  const { items, lang } = props

  return (
    <div>
      <Section>
        <div className="pt-16">
          {[
            items.map((item) => (
              <PostCard key={item.slug} lang={lang} {...item} />
            )),
          ]}
        </div>
      </Section>
    </div>
  )
}

export default PostGallery
