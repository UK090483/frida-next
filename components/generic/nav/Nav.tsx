/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import LangSwitch from '@components/generic/LangSwitcher'
import { useSiteContext } from '@lib/context/context'
import { FridaLocation } from 'types'
import { setMouse } from '../Mouse/mouseRemote'
import BigButtons from './BigButtons'
import Burger from './Burger'
import Links from './Links'
import Icon from 'components/Icon'
import useToggleCart from '@lib/context/useToggleCart'
import { useToggleMegaNav } from '@lib/context/useUi'
import { useCartCount } from '@lib/context/useCart'
import FocusTrap from 'focus-trap-react'

export type NavItems = {
  internalLink: null | string
  link: null | string
  label: null | string
  label_en: null | string
}
type NavProps = {
  items: NavItems[]
  lang: FridaLocation
}

const Nav: React.FC<NavProps> = ({ items, lang }) => {
  const {
    meganav: { isOpen },
  } = useSiteContext()

  const toggleCard = useToggleCart()
  const toggleNav = useToggleMegaNav()
  const count = useCartCount()
  return (
    <div className="relative z-90">
      <Burger onClick={toggleNav} open={isOpen}></Burger>
      <div className="flex bg-opacity-50 rounded-full pointer-events-auto bg-frida-grey "></div>
      <div className="absolute right-0 pointer-events-auto top-14 md:top-0 md:right-16">
        <Icon
          onClick={() => {
            toggleCard()
          }}
          icon="cart"
        />

        {count > 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-[0.5rem] md:text-[0.65rem] transform translate-y-[0.7rem] pointer-events-none md:font-bold md:translate-y-[0.3rem]">
            {count}
          </div>
        )}
      </div>

      <FocusTrap active={isOpen}>
        <div
          role="navigation"
          onKeyDown={(e) => {
            if (e.key === 'Escape' && isOpen) {
              toggleNav()
            }
          }}
          onMouseEnter={() => {
            setMouse('color', false)
          }}
          className={`fixed z-90 w-screen h-vh-100 top-0 right-0 left-0 bottom-0 bg-transparent  `}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
          id="main-menu"
        >
          <div
            className={`bg-frida-black  duration-500  absolute w-vh h-full md:w-vw  rounded-full  right-0 transform-gpu  transition-all ${
              isOpen
                ? 'scale-150 opacity-100'
                : 'opacity-0 scale-0 translate-x-1/2 -translate-y-1/2'
            }`}
          ></div>

          <Links open={isOpen} items={items} lang={lang} />

          {isOpen && <LangSwitch />}
          {isOpen && (
            <Icon
              icon="x"
              bgColor="black"
              color="white"
              className="absolute right-0 mt-2 top-3 mr-frida_side md:top-frida_side_big md:mr-8 border-frida-white border-3"
              onClick={() => {
                toggleNav()
              }}
            />
          )}
          <BigButtons open={isOpen}></BigButtons>
        </div>
      </FocusTrap>
    </div>
  )
}

export default Nav
