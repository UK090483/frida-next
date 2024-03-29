import { usePage } from 'hooks/usePage'
import { getAllDocPathsCached } from 'pageBuilder/queries/fetchDocPathApi'
import {
  handleStaticProps,
  handleStaticPropsResult,
} from 'pageBuilder/queries/handleStaticProps'
import Error from '@pages/404'
import PostSingle, {
  PostPageResult,
  postSingleView,
} from 'PageTypes/Post/PostSingle'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

const query = (locale = '') => `
*[_type == "post" && slug.current == $slug ][0]{
  ${postSingleView(locale)},
}
`
const ArtworkTemplate: React.FC<handleStaticPropsResult<PostPageResult>> = (
  props
) => {
  const { data, slug, previewQuery } = props
  const { pageData, isError } = usePage({ slug, query: previewQuery, data })
  if (!pageData || isError) return <Error />

  return <PostSingle {...pageData} />
}

export const getStaticProps: GetStaticProps = async (props) => {
  return await handleStaticProps({ ...props, query })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('post')
}

export default ArtworkTemplate
