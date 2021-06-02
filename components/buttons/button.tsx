import React from 'react'
import Link from 'next/link'
import { mouseLinkProps } from '../generic/Mouse/mouseRemote'
import { FridaColors } from '../../types'
import cx from 'classnames'

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
    { 'mr-6': position === 'inline' },
    { 'block mb-2': position === 'left' },
    { 'block ml-auto mb-2': position === 'right' },
    { 'block mx-auto mb-2': position === 'center' },
    { 'px-8 py-3 text-sm-fluid border-4': size === 'm' },
    { 'px-6 py-2 text-sx-fluid border-3': size === 's' },
    `text-frida-${color}  hover:text-frida-${backgroundColor} hover:bg-frida-${color}  border-solid border-frida-${color}   rounded-full font-bold `
  )

  if (props.type === 'link') {
    return (
      <Link href={props.link}>
        <button {...mouseLinkProps} className={`${className} ${extraClasses}`}>
          {label}
        </button>
      </Link>
    )
  }

  if (props.type === 'externalLink') {
    return (
      <a
        style={{ cursor: 'none', width: 'fit-content' }}
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
