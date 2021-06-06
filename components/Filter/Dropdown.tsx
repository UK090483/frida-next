/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react'
import Icon from '@components/Icon'
import classNames from 'classnames'

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

  const [activeItem, setActiveItem] = React.useState<null | number>(null)

  const handleClick: (item: Item) => void = (item) => {
    onClick(item)
    if (root.current) {
      root.current.blur()
    }
  }

  return (
    <div className="relative">
      <button
        className="w-72 py-4 mb-4 mx-2 bg-frida-black text-frida-white  rounded-full leading-3"
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveItem((oS) => (oS !== null ? oS - 1 : 0))
          }
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveItem((oS) => (oS !== null ? oS + 1 : 0))
          }
        }}
        aria-expanded={isOpen}
        aria-controls={`dropdown-${label}`}
        aria-haspopup="true"
        aria-label={`filter`}
        onFocus={() => {
          setIsOpen(true)
        }}
        onBlur={() => {
          setTimeout(() => {
            setIsOpen(false)
          }, 100)
        }}
      >
        {label}
      </button>

      <button
        tabIndex={-1}
        className={` absolute top-1.5 right-4 ${
          active ? '' : 'pointer-events-none '
        }`}
        onClick={() => {
          if (active) onClick({ name: '', value: 'clear' })
        }}
      >
        <Icon size="s" icon={active ? 'minus' : 'arrowRight'} />
      </button>

      <div
        role="list"
        className={classNames(
          'absolute w-72 top-16 p-0 list-none mx-2 z-20 rounded-lg  bg-frida-black',
          ' text-gray-700 transform transition-all duration-200',
          { 'max-h-96': isOpen },
          { 'max-h-0': !isOpen },
          { 'overflow-y-scroll': items.length > 9 },
          { 'py-3': isOpen },
          { 'overflow-hidden': !isOpen }
        )}
      >
        {items.map((item, index) => (
          <DropdownItem
            key={index}
            item={item}
            isOpen={isOpen}
            active={activeItem === index}
            onClick={() => {
              setActiveItem(index)
              handleClick(item)
            }}
          />
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          // <div
          //   role="listitem"
          //   key={item.value}
          //   // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          //   onClick={() => {
          //     setActiveItem(index)
          //     handleClick(item)
          //   }}
          //   className={classNames(
          //     'text-sm-fluid  duration-300 py-3 px-3 opacity-0 hover:bg-frida-white  hover:text-frida-black transition-colors',
          //     { 'bg-frida-white text-frida-black': activeItem === index },
          //     { 'bg-frida-black text-frida-white': activeItem !== index },
          //     { 'opacity-100': isOpen }
          //   )}
          // >
          //   {item.name}
          // </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
type DropdownItemProps = {
  item: { name: string; value: string }
  active: boolean
  isOpen: boolean
  onClick: () => void
}
const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  active,
  isOpen,
  onClick,
}) => {
  // const ref = React.useRef<HTMLDivElement | null>(null)

  // React.useEffect(() => {
  //   if (active && ref.current) {
  //     ref.current.focus()
  //   }
  // }, [active, ref])
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      // ref={ref}
      role="listitem"
      key={item.value}
      onClick={onClick}
      className={classNames(
        'text-sm-fluid  duration-300 py-3 px-3 opacity-0 hover:bg-frida-white  hover:text-frida-black transition-colors ',
        { 'bg-frida-white text-frida-black': active },
        { 'bg-frida-black text-frida-white': !active },
        { 'opacity-100': isOpen }
      )}
    >
      {item.name}
    </div>
  )
}
