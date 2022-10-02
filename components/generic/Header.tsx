import { useLayoutContext } from 'pageBuilder/Layout/LayoutContext'
import React from 'react'
import { FridaColors } from '../../types'
import Nav from './nav/Nav'
import PageTitle from './PageTitle'

type HeaderProps = {
  color?: FridaColors
  title?: string
  left?: React.ReactNode
  nav?: boolean
  initialColor?: FridaColors | 'white/pink'
  link?: boolean
}

const Header: React.FC<HeaderProps> = ({
  title = '',
  color = 'white',
  nav = true,
  initialColor,
  link = true,
  children,
}) => {
  const { data } = useLayoutContext()
  const navItems = data?.navigation?.items

  return (
    <header
      data-testid="header"
      className="fixed top-frida_side_big md:top-frida_side_big w-full px-frida_side md:px-frida_side_big z-10  pointer-events-none"
    >
      <div className="w-full flex justify-between items-center">
        {title && (
          <PageTitle
            title={data?.title || 'Frida'}
            color={color}
            link={link}
            initialColor={initialColor || 'white'}
          ></PageTitle>
        )}
        {children}
        {nav && navItems && <Nav items={navItems} />}
      </div>
    </header>
  )
}

export default Header
