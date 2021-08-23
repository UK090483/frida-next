import Icon from '@components/Icon'
import * as React from 'react'
import Option from './Option'
import useSelect from './useSelect'

interface ISelectProps {
  items: { name: string; value: string }[]
  active: string | null | undefined
  onChange: (value: string | null) => void
  label: string
}

const Select: React.FunctionComponent<ISelectProps> = ({
  items = [],
  active,
  onChange = (v) => {
    console.log(v)
  },
  label,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null)

  const {
    maxHeight,
    hasFocus,
    selected,
    handleBlur,
    handleClick,
    handleFocus,
    needScroll,
  } = useSelect({ ref, items, onChange })

  const activeItem = items.find((i) => i.value === active)

  return (
    <div
      className={`h-[40px] text-xs-fluid font-bold relative w-full max-w-[300px] ${
        hasFocus ? 'z-10' : ''
      }`}
    >
      <div
        ref={ref}
        aria-label={`Filter ${label}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`select absolute top-0    w-full max-w-[300px]`}
        role="listbox"
        tabIndex={0}
        id="listbox1"
        aria-labelledby="listbox1label"
        aria-activedescendant="listbox1-1"
      >
        <div className=" w-full h-[20px] rounded-t-full bg-frida-black"></div>
        <div
          className={`h-[22px] bg-frida-black transition-max-height duration-200 ${
            hasFocus ? 'max-h-[22px]' : 'max-h-0'
          }`}
        ></div>
        <div
          style={{ maxHeight }}
          className={`select relative overflow-hidden transition-max-height duration-200 ${
            hasFocus
              ? `${needScroll ? 'overflow-y-scroll  frida-scrollbar' : ''}`
              : 'z-overflow-hidden'
          }`}
        >
          {items.map((item, index) => (
            <Option
              key={item.value}
              {...item}
              selected={selected === index}
              active={active === item.value}
              onClick={handleClick}
            />
          ))}
        </div>

        <div className=" w-full h-[20px] rounded-b-full bg-frida-black"></div>
      </div>

      <label
        className={`absolute top-0 pl-4 flex items-center justify-between w-full h-[40px] text-frida-white ${
          hasFocus ? '' : 'pointer-events-none'
        }`}
        htmlFor={'listbox1'}
      >
        <span className="truncate whitespace-nowrap">
          {label}
          {activeItem ? ` : ${activeItem.name}` : ''}
        </span>
        {activeItem ? (
          <button
            aria-label={`clear Filer ${label}`}
            className="pointer-events-auto "
            onClick={(e) => {
              e.stopPropagation()
              onChange(null)
            }}
          >
            <Icon size="s" icon="x" bgColor="black" color="pink" />
          </button>
        ) : (
          <Icon
            size="s"
            icon="arrowDown"
            bgColor="black"
            color="white"
            className={`transform  transition-transform ${
              hasFocus ? '-rotate-180' : 'rotate-0'
            }`}
          />
        )}
      </label>
    </div>
  )
}

export default Select
