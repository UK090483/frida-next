import Link from 'next/link'
import React from 'react'
import { FridaColors, FridaLocation } from '../../types'
import Nav from './nav/Nav'
import PageTitle from './PageTitle'

type HeaderProps = {
  color?: FridaColors
  title?: string
  left?: React.ReactNode
  nav?: boolean
  initialColor?: FridaColors
  link?: boolean
  navItems: any[]
  lang: FridaLocation
}

const Header: React.FC<HeaderProps> = ({
  title = '',
  color = 'white',
  nav = true,
  initialColor,
  link = true,
  children,
  lang,
  navItems = [],
}) => (
  <header className="fixed top-frida_side_big md:top-frida_side_big w-full px-frida_side md:px-frida_side_big z-10  pointer-events-none">
    <div className="w-full flex justify-between items-center">
      {title && (
        <PageTitle
          title={title}
          color={color}
          link={link}
          initialColor={initialColor || 'white'}
        ></PageTitle>
      )}
      {children}
      {nav && <Nav items={navItems} lang={lang} />}
    </div>
  </header>
)

type ModalHeaderProps = {
  color?: FridaColors
  title?: string
  left?: React.ReactNode
  initialColor?: FridaColors
  link?: boolean
  lang: FridaLocation
  backHref: string
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title = '',
  color = 'white',
  initialColor,
  link = true,
  children,

  backHref = '/',
}) => (
  <div className="fixed top-2 md:top-3 w-full px-2 md:px-5 z-10 pointer-events-none">
    <div className="w-full flex justify-between items-center">
      {title && (
        <PageTitle
          title={title}
          color={color}
          link={link}
          initialColor={initialColor || 'white'}
        ></PageTitle>
      )}
      {children}

      <Link href={backHref} shallow>
        <a>{backHref}</a>
        {/* <div>
          <Icon icon="x" />
        </div> */}
      </Link>
    </div>
  </div>
)

export default Header

export { ModalHeader }
