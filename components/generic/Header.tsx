import { useLayoutContext } from 'pageBuilder/Layout/LayoutContext'
import React from 'react'
import { FridaColors } from '../../types'
import Nav from './nav/Nav'
import PageTitle from './PageTitle'

type HeaderProps = {
  color?: FridaColors

  left?: React.ReactNode
  nav?: boolean
  initialColor?: FridaColors | 'white/pink'
}

const Header: React.FC<HeaderProps> = ({
  color = 'white',
  nav = true,

  children,
}) => {
  const { data } = useLayoutContext()
  const navItems = data?.navigation?.items
  const _initialColor = data?.pageHeader?.initialPageTitleColor

  return (
    <header
      data-testid="header"
      className="fixed top-frida_side_big md:top-frida_side_big w-full px-frida_side md:px-frida_side_big z-10  pointer-events-none"
    >
      <div className="w-full flex justify-between items-center">
        <PageTitle
          id={data?._id || 'id'}
          title={data?.title || 'Frida'}
          color={color}
          link={true}
          initialColor={_initialColor || 'white'}
        ></PageTitle>

        {children}
        {nav && navItems && <Nav items={navItems} />}
      </div>
    </header>
  )
}

export default Header
