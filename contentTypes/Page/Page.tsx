import React from 'react'
import Layout from '@components/generic/Layout'
import BodyParser from 'pageBuilder/BodyParser'
import Header from '@components/generic/Header'
import { FridaLocation } from 'types'
import OverlayCTA from '@components/Adds/Overlay'
import CookieBar from '@components/Cookie'

import NewsletterCTA from 'components/Adds/NewsletterCTA'
import { PageResult } from '@pages/[...slug]'

interface PageProps {
  data: PageResult
  lang: FridaLocation
  preview?: boolean | undefined
}
const Page: React.FC<PageProps> = (props) => {
  const { preview = false, data } = props
  const { content, pageHeader, title_en, site } = data
  const title = props.lang === 'en' && title_en ? title_en : props.data.title

  return (
    <Layout
      preview={preview}
      lang={props.lang}
      data={props.data}
      title={title || 'Not Set'}
      header={
        <Header
          link={!pageHeader?.withOutHomeLink}
          initialColor={pageHeader?.initialPageTitleColor || 'white'}
          title={title || 'Not Set'}
          nav={!pageHeader?.hideMenu}
          navItems={site?.navigation?.items}
          lang={props.lang}
        ></Header>
      }
    >
      <BodyParser lang={props.lang} content={content} />

      <CookieBar />

      <OverlayCTA
        color="pink"
        item={(close) => <NewsletterCTA close={close} />}
      />
    </Layout>
  )
}

export default Page
