import React from 'react'
import Layout from 'pageBuilder/Layout/Layout'
import BodyParser from 'pageBuilder/BodyParser'
import Header from '@components/generic/Header'
import { FridaLocation } from 'types'
import OverlayCTA from '@components/Adds/Overlay'
import CookieBar from '@components/Cookie'

import NewsletterCTA from 'components/Adds/NewsletterCTA'
import type { PageResult } from './pageQueries'

interface PageProps {
  data: PageResult
  lang: FridaLocation
  preview?: boolean | undefined
}
const Page: React.FC<PageProps> = (props) => {
  const { data } = props
  const { content, pageHeader, title_en } = data
  const title = props.lang === 'en' && title_en ? title_en : props.data.title

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

      <CookieBar />

      <OverlayCTA
        color="pink"
        item={(close) => <NewsletterCTA close={close} />}
      />
    </Layout>
  )
}

export default Page
