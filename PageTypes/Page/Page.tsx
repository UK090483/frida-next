import React from 'react'
import Layout from 'pageBuilder/Layout/Layout'
import BodyParser from 'pageBuilder/BodyParser'
import Header from '@components/generic/Header'
import OverlayCTA from '@components/Adds/Overlay'

import NewsletterCTA from 'components/Adds/NewsletterCTA'
import type { PageResult } from './Page.query'
import { useRouter } from 'next/router'

interface PageProps {
  data: PageResult
}
const Page: React.FC<PageProps> = (props) => {
  const { locale } = useRouter()
  const { data } = props
  const { content, pageHeader, title_en } = data
  const title = locale === 'en' && title_en ? title_en : props.data.title

  return (
    <Layout
      title={title || 'Not Set'}
      header={
        <Header
          link={!pageHeader?.withOutHomeLink}
          initialColor={pageHeader?.initialPageTitleColor || 'white'}
          title={title || 'Not Set'}
          nav={!pageHeader?.hideMenu}
        ></Header>
      }
    >
      <BodyParser content={content} />
    </Layout>
  )
}

export default Page
