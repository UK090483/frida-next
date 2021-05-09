import React, { useState } from 'react'
// @ts-ignore
import Flip from 'react-reveal/Flip'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'

type DropdownProps = {
  options: { label: string; value: string | boolean }[]
  open: boolean
  setOpen: (val: string | false) => void
  onChange: (name: string, value: string | boolean) => void
  name: string
  label: string
  fixedHeight?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({
  label = 'no label',
  options,
  open,
  setOpen,
  onChange,
  name,
  fixedHeight = false,
}) => {
  const [selfActive, setSelfActive] = useState<string | boolean>(false)

  const setActive = (i: string | boolean) => {
    setSelfActive(i)
    onChange(name, i)
  }

  return (
    <button
      className={`frida-cursor-hide w-80 mx-auto relative  text-frida-pink text-sm-fluid font-bold border-b-3 border-frida-pink ${
        open ? 'z-10' : ''
      }`}
      {...mouseLinkProps}
    >
      <div
        className="h-12 flex items-center pl-5"
        onClick={() => {
          open ? setOpen(false) : setOpen(label)
        }}
      >
        {label} {selfActive ? ' : ' + selfActive : ''}
      </div>
      <Flip
        top
        cascade
        when={open}
        unmountOnExit={true}
        mountOnEnter={true}
        duration={500}
      >
        <div
          className={`absolute ${
            fixedHeight ? 'max-h-96 overflow-x-hidden overflow-y-scroll' : ''
          } `}
        >
          <div
            className={
              'h-12 w-80 bg-frida-pink hover:bg-frida-white text-frida-white hover:text-frida-pink flex items-center pl-5'
            }
            onClick={() => {
              setActive(false)
              setOpen(false)
            }}
          >
            {'Kein Filter'}
          </div>
          {options.map((option) => (
            <div
              key={option.label}
              className={
                'h-12 w-80 bg-frida-pink hover:bg-frida-white text-frida-white hover:text-frida-pink flex items-center pl-5'
              }
              onClick={() => {
                setActive(option.label)
                setOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </Flip>
    </button>
  )
}

export default Dropdown
