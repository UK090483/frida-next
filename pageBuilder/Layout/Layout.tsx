import Cookie from '@components/Cookie'
import BodyParser from 'pageBuilder/BodyParser'
import { Seo } from 'pageBuilder/Seo/Seo'
import React from 'react'
import { FridaColors } from 'types'
import Footer from '../../components/generic/Footer'
import Mouse from '../../components/generic/Mouse/mouse'

import { useLayoutContext } from './LayoutContext'
import PreviewIndexer from './PreviewIndexer'

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
      <div className={'mx-auto '}>
        {/* {header === 'default' ? (
          <Header initialColor={initialColor} title={title} />
        ) : (
          header
        )} */}
        <main>{children}</main>

        {footer && <BodyParser content={footer.content} />}
        <Footer />
      </div>
      <Seo />
      <Mouse />
      <PreviewIndexer />
      <Cookie />
    </>
  )
}

export default Layout
