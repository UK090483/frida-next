import { handleStaticProps } from '@lib/queries/handleStaticProps'
import { GetStaticProps } from 'next'
import React from 'react'
import { body } from 'pageBuilder/pageBuilderQueries'
export const pageQuery = `
...,
'slug':slug.current,
footer->{${body}},
${body}
'site':'getSite'
`
const ErrorPage = (props: unknown) => {
  return <div>404 {JSON.stringify(props)}</div>
}

const query = `*[_type == "page" && slug.current == 'about'][0]{
  ${pageQuery}
}`

export const getStaticProps: GetStaticProps = async (props) => {
  return await handleStaticProps({ ...{ params: { slug: 'about' } }, query })
}
export default ErrorPage
