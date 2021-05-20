import React from 'react'
import useAnimation from '../../helper/useAnimation'
import useBodyScrollStop from '../../helper/useBodyScrollStop'
import BigButtons from './BigButtons'
import Burger from './Burger'
import Links from './Links'

import { setMouse } from '../Mouse/mouseRemote'
import Icon from '../../lib/Icon'
import { FridaLocation } from 'types'
import LangSwitch from '@components/generic/LangSwitcher'

type NavProps = {
  items: any[]
  lang: FridaLocation
}

const Nav: React.FC<NavProps> = ({ items, lang }) => {
  const { stopBodyScroll, enableBodyScroll } = useBodyScrollStop()

  const { animate, current } = useAnimation(1000)

  const handleMenu = () => {
    animate('toggle')
    if (current) {
      enableBodyScroll()
    } else {
      stopBodyScroll()
    }
  }

  return (
    <div className="z-50">
      <div className="pointer-events-auto flex bg-frida-grey bg-opacity-50 rounded-full ">
        <LangSwitch />
        <Burger
          onClick={() => {
            handleMenu()
          }}
        ></Burger>
      </div>
      <div
        onMouseEnter={() => {
          setMouse('color', false)
        }}
        className={`absolute w-screen h-screen top-0 right-0 left-0 bottom-0 bg-transparent `}
        style={{ pointerEvents: current ? 'auto' : 'none' }}
        id="main-menu"
      >
        <div
          className={`bg-frida-black  duration-500  absolute w-vw h-vw rounded-full  right-0 transform-gpu  transition-all ${
            current
              ? 'scale-150 opacity-100'
              : 'opacity-0 scale-0 translate-x-1/2 -translate-y-1/2'
          }`}
        ></div>

        <Links open={current} items={items} lang={lang} />

        {current && (
          <Icon
            icon="x"
            bgColor="black"
            color="white"
            className="absolute top-0 md:top-1 right-2 md:right-5"
            onClick={handleMenu}
          />
        )}
        <BigButtons open={current}></BigButtons>
      </div>
    </div>
  )
}

export default Nav
