/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react'
import Icon from '@components/Icon'

type Item = { name: string; value: string }
interface IDropdownProps {
  label: string | React.ReactElement
  items: { name: string; value: string }[]
  onClick: (item: Item) => void
  active: boolean
}

const Dropdown: React.FunctionComponent<IDropdownProps> = ({
  label,
  items,
  onClick,
  active,
}) => {
  const root = React.useRef<HTMLButtonElement | null>(null)

  const [isOpen, setIsOpen] = React.useState(false)

  const handleClick: (item: Item) => void = (item) => {
    onClick(item)
    if (root.current) {
      root.current.blur()
    }
  }

  return (
    <button
      aria-expanded={isOpen}
      aria-controls={`dropdown-${label}`}
      className="relative w-72 mb-14  group mx-2"
      aria-haspopup="true"
      aria-label={`filter`}
      onFocus={() => {
        setIsOpen(true)
      }}
    >
      <div
        id={`dropdown-${label}`}
        className="absolute top-0 left-0 text-frida-white text-sm-fluid  w-full  transition-zIndex delay-300  group-focus:z-10 "
      >
        <div className="bg-frida-black rounded-t-full h-5  transition-all duration-200 w-full"></div>
        <div className="bg-frida-black max-h-0 h-5 group-focus:max-h-10  transition-all duration-200 w-full"></div>

        <ul
          className={` p-0 list-none  max-h-0  group-focus:max-h-96 text-gray-700  bg-frida-black  transform transition-all  duration-200 ${
            items.length > 9 ? 'overflow-y-scroll' : 'overflow-hidden'
          } `}
        >
          {items.map((item) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
              key={item.value}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              onClick={() => handleClick(item)}
              className="text-sm-fluid py-3 px-3 bg-frida-black opacity-0 group-focus:opacity-100 transition-opacity delay-200"
            >
              {item.name}
            </li>
          ))}
        </ul>

        <div className="bg-frida-black  group-focus:max-w-full rounded-b-full h-5  transition-all duration-200 w-full"></div>
      </div>

      <div className="bg-transparent text-frida-white w-full absolute top-0 h-10 flex justify-center items-center transition-zIndex delay-300 group-focus:z-10">
        {label}
      </div>

      {!active && (
        <Icon
          icon="arrowRight"
          size="s"
          className="absolute right-1 top-1 transform rotate-90"
        />
      )}
    </button>
  )
}

export default Dropdown
