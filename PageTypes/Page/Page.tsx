import React from 'react'
import Layout from 'pageBuilder/Layout/Layout'
import BodyParser from 'pageBuilder/BodyParser'

import type { PageResult } from './Page.query'

interface PageProps {
  data: PageResult
}
const Page: React.FC<PageProps> = (props) => {
  const { data } = props
  const { content } = data

  return (
    <Layout>
      <BodyParser content={content} />
    </Layout>
  )
}

export default Page
