import React from 'react'
import Link from 'next/link'
import { setMouse } from '../../generic/Mouse/mouseRemote'
import { FridaColors } from '../../../types'

interface ButtonProps {
  label: string
  color?: FridaColors
  backgroundColor?: FridaColors
  testid?: string
  className?: string
  inline?: boolean
  size?: 's' | 'm' | 'l'
}
interface LinkProps extends ButtonProps {
  type: 'link' | 'externalLink'
  link: string
}
interface ClickProps extends ButtonProps {
  type: 'click'
  onClick: () => void
}

const widthMouseEnter = {
  onMouseEnter: () => {
    setMouse('link', true)
  },
  onMouseLeave: () => {
    setMouse('link', false)
  },
}

const Button: React.FC<LinkProps | ClickProps> = (props) => {
  const {
    label,
    color = 'black',
    backgroundColor = 'white',
    className: extraClasses = '',
    inline = true,
  } = props

  const className = `text-frida-${color} ${
    inline ? 'inline-block' : 'block'
  }  mr-6 text-sm-fluid hover:text-frida-${backgroundColor} hover:bg-frida-${color} border-3 border-solid border-frida-${color}  px-8 py-3 rounded-full font-bold `

  if (props.type === 'link') {
    return (
      <Link
        // style={{ cursor: 'none', width: 'fit-content' }}
        {...widthMouseEnter}
        href={props.link}
      >
        <div className={`${className} ${extraClasses}`}>{label}</div>
      </Link>
    )
  }

  if (props.type === 'externalLink') {
    return (
      <a
        style={{ cursor: 'none', width: 'fit-content' }}
        {...widthMouseEnter}
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
        {...widthMouseEnter}
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
