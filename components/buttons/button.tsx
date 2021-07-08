import React from 'react'
import Link from 'next/link'
import { mouseLinkProps } from '../generic/Mouse/mouseRemote'
import { FridaColors } from '../../types'
import cx from 'classnames'
import { imageMeta } from '@lib/queries/snippets'

interface ButtonProps {
  label: string
  color?: FridaColors
  backgroundColor?: FridaColors
  testid?: string
  className?: string
  size?: 's' | 'm' | 'l'
  position?: 'inline' | 'left' | 'right' | 'center' | 'auto'
}
interface LinkProps extends ButtonProps {
  type: 'link' | 'externalLink'
  link: string
  download?: boolean
}
interface ClickProps extends ButtonProps {
  type: 'click'
  onClick: () => void
}

const Button: React.FC<LinkProps | ClickProps> = (props) => {
  const {
    label = 'no label',
    color = 'black',
    backgroundColor = 'white',
    className: extraClasses = '',
    position = 'inline',
    size = 'm',
  } = props

  const className = cx(
    'button',
    { 'mr-6': position === 'inline' },
    { 'block mb-2 w-fit-content': position === 'left' },
    { 'block ml-auto mb-2 w-fit-content': position === 'right' },
    { 'block mx-auto mb-2 w-fit-content': position === 'center' },
    { 'is-large': size === 'l' },
    { 'is-medium': size === 'm' },
    { 'is-small': size === 's' },
    { 'text-frida-red border-frida-red hover:bg-frida-red': color === 'red' },
    {
      'text-frida-green border-frida-green hover:bg-frida-green':
        color === 'green',
    },
    {
      'text-frida-black border-frida-black hover:bg-frida-black':
        color === 'black',
    },
    {
      'text-frida-pink border-frida-pink hover:bg-frida-pink': color === 'pink',
    },
    { 'text-frida-white hover:bg-frida-white': color === 'white' },
    { 'hover:text-frida-red': backgroundColor === 'red' },
    { 'hover:text-frida-black': backgroundColor === 'black' },
    { 'hover:text-frida-pink': backgroundColor === 'pink' },
    { 'hover:text-frida-white': backgroundColor === 'white' }
  )

  if (props.type === 'link') {
    return (
      <Link href={props.link} passHref>
        <a
          target="_blank"
          {...(props.download === true ? { download: true } : {})}
          {...mouseLinkProps}
          className={` ${className} ${extraClasses}`}
        >
          {label}
        </a>
      </Link>
    )
  }

  if (props.type === 'externalLink') {
    return (
      <a
        style={{ cursor: 'none' }}
        {...mouseLinkProps}
        className={`${className} ${extraClasses}`}
        href={props.link}
      >
        {label}
      </a>
    )
  }

  if (props.type === 'click') {
    return (
      <button
        style={{ cursor: 'none' }}
        {...mouseLinkProps}
        className={` ${className} ${extraClasses}`}
        onClick={() => {
          props.onClick()
        }}
      >
        {label}
      </button>
    )
  }

  return <></>
}

export default Button
