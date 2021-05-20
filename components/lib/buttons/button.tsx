import React from 'react'
import Link from 'next/link'
import { mouseLinkProps } from '../../generic/Mouse/mouseRemote'
import { FridaColors } from '../../../types'
import cx from 'classnames'

interface ButtonProps {
  label: string
  color?: FridaColors
  backgroundColor?: FridaColors
  testid?: string
  className?: string
  size?: 's' | 'm' | 'l'
  position?: 'inline' | 'left' | 'right' | 'center'
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
  } = props

  const className = cx(
    { 'mr-6': position === 'inline' },
    { 'block mb-2': position === 'left' },
    { 'block ml-auto mb-2': position === 'right' },
    { 'block mx-auto mb-2': position === 'center' },
    `text-frida-${color} text-sm-fluid hover:text-frida-${backgroundColor} hover:bg-frida-${color} border-3 border-solid border-frida-${color}  px-8 py-3 rounded-full font-bold `
  )

  if (props.type === 'link') {
    return (
      <Link href={props.link}>
        <button
          {...mouseLinkProps}
          className={` ${className} ${extraClasses} `}
        >
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
