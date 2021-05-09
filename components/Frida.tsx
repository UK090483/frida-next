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
      #Meet
      <span
        style={{
          textDecorationColor: 'black',
          textDecorationThickness: '0.16em',
        }}
        color={color}
        className={`border-frida-${color} text-frida-${textColor} underline `}
      >
        {text}
      </span>
    </span>
  )
}
export default Frida
