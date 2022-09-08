import React from 'react'
import classNames from 'classnames'
import { FridaColors } from '../types'

type FridaProps = {
  text?: string
  textColor?: FridaColors
  color?: FridaColors
}

const Frida: React.FC<FridaProps> = ({
  text = 'Frida',
  textColor = 'white',
  color = 'black',
}) => {
  return (
    <span className={`frida text-frida-${color}`}>
      Meet
      <span
        color={color}
        className={classNames(
          `frida--text border-frida-${color} text-frida-${textColor}`,
          { 'decoration-frida-black': color === 'black' },
          { 'decoration-frida-white': color === 'white' }
        )}
      >
        {text}
      </span>
    </span>
  )
}
export default Frida
