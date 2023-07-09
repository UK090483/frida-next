import Layout from 'pageBuilder/Layout/Layout'

import BodyParser from 'pageBuilder/BodyParser'
import React from 'react'
import Photo from '@components/Photo'

import CarouselHeroItem from '@components/CarouselHero/CarouselItem'
import { ExhibitionPageResult } from './Exhibition.Single.query'

const PostSingle: React.FC<ExhibitionPageResult> = (props) => {
  const { headerImage, content, title, default_header } = props

  return (
    <>
      <Layout>
        {default_header !== false && (
          <CarouselHeroItem
            color={'pink'}
            image={<Photo photo={headerImage} layout="fill" />}
            content={<h1 className="pb-10 header-small">{title}</h1>}
          />
        )}
        {content && <BodyParser content={content} />}
      </Layout>
    </>
  )
}

export default PostSingle
