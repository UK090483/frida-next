import { SiteResult } from '@lib/queries/cache'
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
  initialColor?: FridaColors | 'white/pink'
  children: React.ReactNode
  navItems?: any
  data?: { site: SiteResult }
  preview: boolean
  page?: any
  schema?: any
}

const Layout: React.FC<LayoutProps> = (props) => {
  const {
    preview,
    data,
    children,
    title,
    header = 'default',
    initialColor = 'white',
    lang,
  } = props

  //@ts-ignore
  const footer = data?.footer || data?.site.footer

  const navItems = data?.site.navigation?.items

  return (
    <>
      {data?.site && <SEO site={data.site} page={data} />}

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
            navItems={navItems}
            initialColor={initialColor}
            title={title}
          />
        ) : (
          header
        )}
        <main>{children}</main>
        {/* <CookieConsent /> */}
        {footer && <BodyParser lang={props.lang} content={footer.content} />}
        <Footer
          lang={lang}
          nav={data?.site.navigation?.footerItems}
          imprintSlug={data?.site.navigation?.imprintSite}
          agbSlug={data?.site.navigation?.agbSite}
        />
      </m.div>
      <Mouse />
      {preview && <PreviewIndexer />}
    </>
  )
}

export default Layout

const PreviewIndexer: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      className="fixed p-3 rounded-md left-2 bottom-2 border-frida-red border-3 "
      href="/api/clearPreview"
    >
      Exit Preview
    </a>
  )
}
