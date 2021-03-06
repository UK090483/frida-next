import React from 'react'
import { mouseLinkProps } from '../generic/Mouse/mouseRemote'

type HeroNavProps = {
  current: number
  setValue: (value: number) => void
  items: unknown[]
  pause: boolean
}
const HeroNav: React.FC<HeroNavProps> = ({
  current,
  setValue,
  items,
  pause,
}) => {
  return (
    <div className="flex items-center mb-5 ml-3 pointer-events-auto md:ml-12">
      {items.map((_, index) => (
        <NavigationItem
          pause={pause}
          key={index}
          num={index + 1}
          current={current}
          setValue={setValue}
        />
      ))}
    </div>
  )
}

export default HeroNav

type HeroNavItemProps = {
  current: number
  setValue: (next: number) => void
  num: number
  pause: boolean
}

const NavigationItem: React.FC<HeroNavItemProps> = ({
  num,
  current,
  setValue,
}) => {
  const active = num - 1 === current
  return (
    <>
      <button
        tabIndex={-1}
        className="px-2 font-bold text-sm-fluid"
        {...mouseLinkProps}
        onClick={() => {
          setValue(num - 1)
        }}
      >
        {num}
      </button>

      <div
        className={`h-1 relative overflow-hidden transform bg-frida-white ${
          active ? 'w-12' : 'w-0'
        }`}
      >
        <div
          className={`bg-frida-black w-12 h-1 absolute top-0 left-0 transform  duration-5000 ease-linear transition-transform ${
            active ? 'translate-x-0' : '-translate-x-full'
          }`}
        ></div>
      </div>
    </>
  )
}
