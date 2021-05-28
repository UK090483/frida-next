//@ts-nocheck
import { SiteResult } from '@lib/queries/pageQueries'
import { m, Variants } from 'framer-motion'
import BodyParser from 'pageBuilder/BodyParser'
import React from 'react'
import { FridaColors, FridaLocation } from 'types'
import Footer from './Footer'
import Header from './Header'
import Mouse from './Mouse/mouse'
import SEO from './seo'

const duration = 0.2

const variants: Variants = {
  initial: {
    opacity: 0,
  },

  enter: {
    opacity: 1,
    transition: {
      duration: duration,
      delay: 0.1,
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
  lang: FridaLocation
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

  const site = data.site

  return (
    <>
      <SEO site={data.site} page={data} />

      <m.div
        key={title}
        initial={'initial'}
        animate={'enter'}
        exit={'exit'}
        variants={variants}
        className={'mx-auto '}
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
        {site.footer && site.footer.content && (
          <BodyParser lang={props.lang} content={site.footer.content} />
        )}
        <Footer></Footer>
      </m.div>
      <Mouse />
    </>
  )
}

export default Layout
