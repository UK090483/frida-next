import { usePage } from '@lib/queries/usePage'
import { getAllDocPathsCached } from '@lib/queries/fetchDocPathApi'
import { handleStaticProps } from '@lib/queries/handleStaticProps'
import Error from '@pages/404'
import PostSingle, {
  PostPageResult,
  postSingleView,
} from 'contentTypes/Post/PostSingle'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { FridaLocation } from 'types'

type PostTemplateProps = {
  data: PostPageResult
  lang: FridaLocation
  slug: string
  preview: boolean | undefined
}

const query = `
*[_type == "post" && slug.current == $slug ][0]{
  ${postSingleView},
}
`
const ArtworkTemplate: React.FC<PostTemplateProps> = (props) => {
  const { data, lang, slug, preview } = props
  const { pageData, isError } = usePage({ slug, query, data, preview })
  if (isError) return <Error />

  return <PostSingle lang={lang} {...pageData} />
}

export const getStaticProps: GetStaticProps = async (props) => {
  return await handleStaticProps({ ...props, query })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('post')
}

export default ArtworkTemplate
