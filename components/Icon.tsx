/* eslint-disable @typescript-eslint/no-explicit-any */
import { MailIcon, ShareIcon } from '@heroicons/react/outline'
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  MenuIcon,
  XIcon,
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon,
} from '@heroicons/react/solid'

import classNames from 'classnames'
import React from 'react'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { GoCreditCard } from 'react-icons/go'
import { FridaColors } from 'types'
import { mouseLinkProps } from './generic/Mouse/mouseRemote'
// import { getIcon } from './svgs'

interface IconsObject {
  [k: string]: any
}

const Icons: IconsObject = {
  facebook: FaFacebook,
  whatsApp: FaWhatsapp,
  twitter: FaTwitter,
  email: MailIcon,
  share: ShareIcon,
  creditCard: GoCreditCard,
  menu: MenuIcon,
  arrowLeft: ArrowNarrowLeftIcon,
  arrowRight: ArrowNarrowRightIcon,
  x: XIcon,

  cart: ShoppingBagIcon,
  plus: PlusIcon,
  minus: MinusIcon,
}

type IconProps = {
  icon:
    | 'facebook'
    | 'whatsApp'
    | 'twitter'
    | 'email'
    | 'share'
    | 'creditCard'
    | 'menu'
    | 'arrowLeft'
    | 'arrowRight'
    | 'x'
    | 'cart'
    | 'plus'
    | 'minus'

  size?: 's' | 'm' | 'l'
  className?: string
  color?: FridaColors
  bgColor?: FridaColors
  onClick?: () => void
  [k: string]: any
  withMouseHover?: boolean
}

const Icon: React.FC<IconProps> = ({
  icon,
  size = 'm',
  className,
  color = 'black',
  bgColor = 'white',
  onClick = () => null,
  withMouseHover = true,
  ...rest
}) => {
  if (!Icons[icon]) return <div>icon</div>
  return (
    <div
      className={classNames(
        `rounded-full bg-frida-${bgColor} text-frida-${color}`,
        {
          'w-8 h-8 md:w-12 md:h-12 p-2': size === 'm',
        },
        {
          'w-8 h-8 p-2 ': size === 's',
        },
        className
      )}
    >
      {React.createElement(Icons[icon], {
        ...(withMouseHover ? mouseLinkProps : {}),
        onClick,

        key: icon,
        ...rest,
      })}
    </div>
  )
}

export default Icon
