import { m, Variants } from 'framer-motion'
import BodyParser from 'pageBuilder/BodyParser'
import React from 'react'
import { FridaColors } from 'types'
import Footer from '../../components/generic/Footer'
import Header from '../../components/generic/Header'
import Mouse from '../../components/generic/Mouse/mouse'
import SEO from '../../components/generic/seo'
import { useLayoutContext } from './LayoutContext'
import PreviewIndexer from './PreviewIndexer'

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
  title: string
  header?: string | React.ReactElement
  initialColor?: FridaColors | 'white/pink'
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, title, header = 'default', initialColor = 'white' } = props

  const { data } = useLayoutContext()
  const footer = data?.footer

  return (
    <>
      {data && <SEO site={data} page={data} />}
      <m.div
        key={title}
        initial={'initial'}
        animate={'enter'}
        exit={'exit'}
        variants={variants}
        className={'mx-auto '}
      >
        {header === 'default' ? (
          <Header initialColor={initialColor} title={title} />
        ) : (
          header
        )}
        <main>{children}</main>
        {/* <CookieConsent /> */}
        {footer && <BodyParser content={footer.content} />}
        <Footer />
      </m.div>
      <Mouse />
      <PreviewIndexer />
    </>
  )
}

export default Layout
