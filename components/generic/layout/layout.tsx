//@ts-nocheck
import React from 'react'
import { m } from 'framer-motion'
import { imageBuilder } from '@lib/sanity'
import Head from 'next/head'
// import CookieConsent from '../../CookieConsent/CookieConsent'
import Footer from '../Footer/footer'
import Mouse from '../Mouse/mouse'
import Header from '../header/Header'
import { FridaColors } from 'types'
import generateSchema from '@lib/schema'
import useSeo from '@lib/useSeo'
import { SiteResult } from '@lib/queries/pageQueries'

const duration = 0.4
const variants = {
  initial: {
    opacity: 0,
  },
  none: {
    opacity: 1,
  },
  enter: {
    opacity: 1,

    transition: {
      duration: duration,
      delay: 0.3,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration, ease: 'linear', when: 'beforeChildren' },
  },
}

type LayoutProps = {
  title: string
  header?: string | React.ReactElement
  initialColor?: FridaColors
  children: React.ReactNode
  navItems?: any
  data: { site: SiteResult }

  page?: any
  schema?: any
}

const Layout: React.FC<LayoutProps> = (props) => {
  const {
    data = {},
    schema,
    children,
    title,
    header = 'default',
    initialColor = 'white',
    navItems = [],
  } = props

  // const s = useSeo(data.site.seo, data)

  const site = data.site
  const page = data

  const siteTitle = site.seo?.siteTitle
  const siteIcon = site.seo?.siteIcon

  const siteIconSrc = imageBuilder.image(siteIcon).width(180).height(180).url()

  const metaTitle = page.seo?.metaTitle || site.seo?.metaTitle
  const metaDesc = page.seo?.metaDesc || site.seo?.metaDesc

  const shareTitle = page.seo?.shareTitle || site.seo?.shareTitle
  const shareDesc = page.seo?.shareDesc || site.seo?.shareDesc
  const shareGraphic =
    page.seo?.shareGraphic?.asset || site.seo?.shareGraphic?.asset

  const shareGraphicSrc = imageBuilder
    .image(shareGraphic)
    .width(1200)
    .height(630)
    .url()

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="format-detection" content="telephone=no" />

        <link preload="true" rel="icon" href="/favicon.svg" />
        <link
          preload="true"
          rel="mask-icon"
          href="/favicon.svg"
          color="#000000"
        />
        {siteIconSrc && <link rel="apple-touch-icon" href={siteIconSrc} />}
        <link rel="preconnect" href="https://hull-demo.myshopify.com" />

        <link rel="preconnect" href="https://cdn.sanity.io" />

        <title>{metaTitle}</title>
        {metaDesc && <meta name="description" content={metaDesc} />}
        {shareTitle && (
          <>
            <meta property="og:title" content={shareTitle} />
            <meta name="twitter:title" content={shareTitle} />
          </>
        )}
        {shareDesc && (
          <>
            <meta property="og:description" content={shareDesc} />
            <meta name="twitter:description" content={shareDesc} />
          </>
        )}
        {shareGraphicSrc && (
          <>
            <meta property="og:image" content={shareGraphicSrc} />
            <meta name="twitter:image" content={shareGraphicSrc} />
          </>
        )}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        {siteTitle && <meta name="og:site_name" content={siteTitle} />}
        {schema && generateSchema(schema)}
      </Head>

      <m.div
        initial={'initial'}
        animate={'enter'}
        exit={'exit'}
        variants={variants}
        style={{ maxWidth: 2600 }}
        className="mx-auto "
      >
        {header === 'default' ? (
          <Header
            lang={'de'}
            initial={'initial'}
            animate={'enter'}
            exit={'exit'}
            variants={variants}
            navItems={navItems}
            initialColor={initialColor}
            title={title}
          />
        ) : (
          header
        )}
        <main>{children}</main>
        {/* <CookieConsent /> */}
        <Footer title={title}></Footer>
      </m.div>
      <Mouse />
    </>
  )
}

export default Layout
