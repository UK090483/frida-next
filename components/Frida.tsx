import React from 'react'
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
    <span className={`inline whitespace-nowrap text-frida-${color}`}>
      Meet
      <span
        style={{
          textDecorationThickness: '0.16em',
        }}
        color={color}
        className={`border-frida-${color} text-frida-${textColor} underline decoration-frida-${color} `}
      >
        {text}
      </span>
    </span>
  )
}
export default Frida
