import { MailIcon, ShareIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/solid'

import cx from 'classnames'
import React from 'react'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { GoCreditCard } from 'react-icons/go'
import { FridaColors } from 'types'
import { mouseLinkProps } from '../generic/Mouse/mouseRemote'

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

  size?: 's' | 'm' | 'l'
  className?: string
  color?: FridaColors
  bgColor?: FridaColors
  onClick?: () => void
  [k: string]: any
}

const Icon: React.FC<IconProps> = ({
  icon,
  size = 'm',
  className,
  color = 'black',
  bgColor = 'white',
  onClick = () => {},
  ...rest
}) => {
  if (!Icons[icon]) return <div>icon</div>

  return React.createElement(Icons[icon], {
    ...mouseLinkProps,
    onClick,
    className: cx(
      `rounded-full bg-frida-${bgColor} text-frida-${color}`,
      {
        'w-12 h-12 p-1.5': size === 'm',
      },
      {
        'w-8 h-8 p-2 ': size === 's',
      },
      className
    ),
    key: icon,
    ...rest,
  })
}

export default Icon
