import React from 'react'
import Layout from '@components/generic/layout/layout'
// import SEO from '../components/generic/seo/seo'
import ContentParser from './ContentParser'
import Header from '../components/generic/header/Header'
import { FridaColors, FridaLocation } from '../types'
import OverlayCTA from '../components/Adds/Overlay'
import CookieBar from '@modules/shared/cookie-bar'

type PageProps = {
  data: {
    title: string
    title_en: string
    content: any[]
    slug: { current: string }
    pageHeader?: {
      hideMenu?: boolean
      initialPageTitleColor?: FridaColors
      withOutHomeLink?: boolean
    }
    site: {
      navigation: {
        items: any[]
      }
    }
  }
  lang: FridaLocation
}
const Page: React.FC<PageProps> = (props) => {
  const { content, slug, pageHeader, title_en, site } = props.data
  const title = props.lang === 'en' && title_en ? title_en : props.data.title

  return (
    <Layout
      data={props.data}
      title={title || 'Not Set'}
      header={
        <Header
          link={!pageHeader?.withOutHomeLink}
          initialColor={pageHeader?.initialPageTitleColor || 'white'}
          title={title || 'Not Set'}
          nav={!pageHeader?.hideMenu}
          navItems={site?.navigation.items}
          lang={props.lang}
        ></Header>
      }
    >
      {/* <SEO path={slug.current} title={title} /> */}
      <ContentParser lang={props.lang} content={content} />

      <CookieBar />

      {/* <OverlayCTA
        color="black"
        item={(close) => (
          <div
            onClick={close}
            className={'bg-frida-white w-60 h-80 rounded-lg p-10'}
          >
            child
          </div>
        )}
      /> */}
    </Layout>
  )
}

export default Page
