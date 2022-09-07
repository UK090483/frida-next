import * as React from 'react'
import cx from 'classnames'
import { FridaColors } from 'types'

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  color?: FridaColors
}

const Input: React.FunctionComponent<IInputProps> = (props) => {
  const { color, ...rest } = props
  return (
    <input
      className={cx(
        'font-bold text-sm-fluid md:text-base-fluid min-h-[50px]  w-full  text-center',
        'form-input',
        ' text-frida-white border-transparent rounded-full',
        { 'bg-frida-pink': color === 'pink', 'bg-black': !color }
      )}
      {...rest}
    />
  )
}

export default Input
