import { usePage } from 'hooks/usePage'
import { getAllDocPathsCached } from 'pageBuilder/queries/fetchDocPathApi'
import {
  handleStaticProps,
  handleStaticPropsResult,
} from 'pageBuilder/queries/handleStaticProps'
import Error from '@pages/404'
import {
  exhibitionSingleQuery,
  ExhibitionPageResult,
} from 'PageTypes/Exhibition/Exhibition.Single.query'

import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import PageType from 'pageBuilder/PageType'
import ExhibitionSingle from 'PageTypes/Exhibition/Exhibition.Single'

const query = (locale = '') => `
*[_type == "exhibition" && slug.current == $slug ][0]{
  ${exhibitionSingleQuery(locale)},
}
`
const ArtworkTemplate: React.FC<
  handleStaticPropsResult<ExhibitionPageResult>
> = (props) => {
  return (
    <PageType {...props}>{(data) => <ExhibitionSingle {...data} />}</PageType>
  )
}

export const getStaticProps: GetStaticProps = async (props) => {
  return await handleStaticProps({ ...props, query })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('exhibition')
}

export default ArtworkTemplate
