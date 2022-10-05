import Cookie from '@components/Cookie'
import BodyParser from 'pageBuilder/BodyParser'
import { Seo } from 'pageBuilder/Seo/Seo'
import React, { useRef } from 'react'
import Footer from '../../components/generic/Footer'
import Mouse from '../../components/generic/Mouse/mouse'
import { m, Variants } from 'framer-motion'
import { useLayoutContext } from './LayoutContext'
import PreviewIndexer from './PreviewIndexer'
import { useRouter } from 'next/router'
import Header from '@components/generic/Header'

type LayoutProps = {
  children: React.ReactNode
}

const duration = 0.2
const variants: Variants = {
  initial: {
    opacity: 0,
  },

  enter: {
    opacity: 1,
    transition: {
      duration: duration,
      delay: 0,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration, ease: 'easeOut', when: 'beforeChildren' },
  },
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  const { data } = useLayoutContext()
  const footer = data?.footer

  return (
    <>
      <m.div
        key={data?._id}
        initial={'initial'}
        animate={'enter'}
        exit={'exit'}
        variants={variants}
        className={'mx-auto '}
      >
        <Header />
        <main>{children}</main>

        {footer && <BodyParser content={footer.content} />}
        <Footer />
      </m.div>
      <Seo />
      <Mouse />
      <PreviewIndexer />
      <Cookie />
    </>
  )
}

export default Layout
