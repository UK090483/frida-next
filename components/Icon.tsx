/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck
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

import { BiShoppingBag } from 'react-icons/bi'
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
  menu: (props) => {
    return (
      <svg
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="square"
        {...props}
      >
        <path stroke="none" d="M0 0h24v24H0z" />{' '}
        <line x1="4" y1="6" x2="20" y2="6" />{' '}
        <line x1="4" y1="12" x2="20" y2="12" />{' '}
        <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
    )
  },
  arrowLeft: ArrowNarrowLeftIcon,
  arrowRight: ArrowNarrowRightIcon,
  x: (props: any) => {
    return (
      <svg
        width="24px"
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="square"
      >
        <line x1="18" y1="6" x2="6" y2="18" />{' '}
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    )
  },
  cart: (props: any) => {
    return (
      <svg
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="square"
        viewBox="0 0 24 24"
        stroke="currentColor"
        {...props}
      >
        <path strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
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
