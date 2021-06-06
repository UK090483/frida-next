import LangSwitch from '@components/generic/LangSwitcher'
import { useSiteContext, useToggleCart, useToggleMegaNav } from '@lib/context'
import React from 'react'
import { FridaLocation } from 'types'
import useBodyScrollStop from '../../helper/useBodyScrollStop'

import { setMouse } from '../Mouse/mouseRemote'
import BigButtons from './BigButtons'
import Burger from './Burger'
import Links from './Links'
import Icon from 'components/Icon'

type NavProps = {
  items: any[]
  lang: FridaLocation
}

const Nav: React.FC<NavProps> = ({ items, lang }) => {
  const { stopBodyScroll, enableBodyScroll } = useBodyScrollStop()

  const {
    meganav: { isOpen },
  } = useSiteContext()

  const toggleCard = useToggleCart()

  const toggleNav = useToggleMegaNav()

  const handleMenu = () => {
    toggleNav('toggle')

    if (isOpen) {
      enableBodyScroll()
    } else {
      stopBodyScroll()
    }
  }

  return (
    <div className="z-90 ">
      <div className="pointer-events-auto flex bg-frida-grey bg-opacity-50 rounded-full ">
        <LangSwitch />
        <Burger
          onClick={() => {
            handleMenu()
          }}
        ></Burger>
      </div>
      <Icon
        onClick={() => {
          toggleCard()
        }}
        icon="cart"
        className="absolute top-10 right-frida_side md:top-20 md:right-5 pointer-events-auto"
      />
      <div
        onMouseEnter={() => {
          setMouse('color', false)
        }}
        className={`fixed z-90 w-screen h-screen top-0 right-0 left-0 bottom-0 bg-transparent `}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        id="main-menu"
      >
        <div
          className={`bg-frida-black  duration-500  absolute w-vh h-vh md:w-vw md:h-vw rounded-full  right-0 transform-gpu  transition-all ${
            isOpen
              ? 'scale-150 opacity-100'
              : 'opacity-0 scale-0 translate-x-1/2 -translate-y-1/2'
          }`}
        ></div>

        <Links open={isOpen} items={items} lang={lang} />

        {isOpen && (
          <Icon
            icon="x"
            bgColor="black"
            color="white"
            className="absolute top-2 mr-frida_side right-0 md:top-6  md:mr-8 border-frida-white border-3"
            onClick={handleMenu}
          />
        )}
        <BigButtons open={isOpen}></BigButtons>
      </div>
    </div>
  )
}

export default Nav
