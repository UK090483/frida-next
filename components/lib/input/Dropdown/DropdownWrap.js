import React from "react"

import Flip from "react-reveal/Flip"
import { mouseLinkProps } from "../../../../components/generic/Mouse/mouseRemote"

export default function Input({
  label = "no label",
  options,
  open,
  setOpen,
  setFilter,
  filterName,
  fixedHeight = false,
  selected,
}) {
  const setActive = i => {
    setFilter(filterName, i)
  }

  return (
    <button
      className={`frida-cursor-hide w-80 mx-auto relative  text-frida-green text-sm-fluid font-bold border-b-3 border-frida-green ${
        open ? "z-10" : ""
      }`}
      {...mouseLinkProps}
    >
      <div
        className="h-12 flex items-center pl-5"
        onClick={() => {
          open ? setOpen(false) : setOpen(label)
        }}
      >
        {label} : {selected}
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
            fixedHeight ? "max-h-96 overflow-x-hidden overflow-y-scroll" : ""
          } `}
        >
          {options.map(option => (
            <div
              key={option.value}
              className={
                "h-12 w-80 bg-frida-green hover:bg-frida-white text-frida-white hover:text-frida-green flex items-center pl-5"
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
