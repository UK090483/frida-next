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

  return (
    <div className="z-90 ">
      <Burger onClick={toggleNav}></Burger>
      <div className="pointer-events-auto flex bg-frida-grey bg-opacity-50 rounded-full "></div>
      <div className="absolute  right-frida_side top-12 md:top-0.5 md:right-20  pointer-events-auto">
        <Icon
          onClick={() => {
            toggleCard()
          }}
          icon="cart"
        />
      </div>

      <div
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
            className="absolute mt-2 top-frida_side mr-frida_side right-0 md:top-frida_side_big  md:mr-8 border-frida-white border-3"
            onClick={() => {
              toggleNav()
            }}
          />
        )}
        <BigButtons open={isOpen}></BigButtons>
      </div>
    </div>
  )
}

export default Nav
