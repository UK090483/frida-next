import React from 'react'

import FridaImage from '@components/fridaImage/FridaImage'
import { PostPageResult } from '@lib/queries/postQueries'
import BodyParser from 'pageBuilder/BodyParser'
import { FridaLocation } from 'types'
import Section from '@components/container/section'
import { ConditionalWrapper } from '@lib/helpers'
import Layout from '@components/generic/layout/layout'

interface PostSingleProps extends PostPageResult {
  lang: FridaLocation
  widthLayout?: boolean
}

const PostSingle: React.FC<PostSingleProps> = (props) => {
  const {
    headerImage,
    content,
    lang,
    title,
    title_en,
    site,
    widthLayout = true,
    categories,
  } = props

  const _headerTitle =
    categories && categories[0]
      ? lang === 'en'
        ? categories[0].title_en
        : categories[0].title
      : 'no Category'

  const _title = lang === 'en' && title_en ? title_en : title

  return (
    <>
      <ConditionalWrapper
        condition={widthLayout}
        wrapper={(children: any) => {
          return (
            <Layout
              initialColor="pink"
              title={_headerTitle}
              navItems={site?.navigation?.items}
              data={props}
            >
              {children}
            </Layout>
          )
        }}
      >
        <div className="flex h-vh flex-wrap  bg-frida-white">
          <div className="w-full  md:w-1/2 flex justify-center items-center p-20 mt-28">
            <h1 className="header-small pb-10">{_title}</h1>
          </div>

          <div className="w-full  md:w-1/2">
            <FridaImage
              className="w-full h-full"
              photo={headerImage}
              layout="fill"
            />
          </div>
        </div>

        {content && <BodyParser lang={lang} content={content} />}
      </ConditionalWrapper>
    </>
  )
}

export default PostSingle
