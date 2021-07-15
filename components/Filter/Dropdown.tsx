/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react'
import Icon from '@components/Icon'
import classNames from 'classnames'
import Popup from 'reactjs-popup'
import { PopupActions } from 'reactjs-popup/dist/types'

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
  const popupRemote = React.useRef<PopupActions | null>(null)
  const [activeItem, setActiveItem] = React.useState<number>(-1)
  const [activeItemChosen, setActiveItemChosen] = React.useState<number>(-1)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleKeyUp = React.useCallback(
    (event: KeyboardEvent) => {
      event.stopPropagation()
      if (event.key === 'ArrowDown') {
        setActiveItemChosen((oS) => oS + 1)
        console.log('down')
      }
      if (event.key === 'ArrowUp') {
        console.log('up')
        setActiveItemChosen((oS) => oS - 1)
      }
    },
    [setActiveItemChosen]
  )
  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('keyup', handleKeyUp)
    } else {
      window.removeEventListener('keyup', handleKeyUp)
    }

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [isOpen, handleKeyUp])

  return (
    <Popup
      ref={popupRemote}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      arrow={false}
      on={['click']}
      trigger={
        <div className="relative">
          <button
            className={`h-10 mx-2 mb-4 leading-3 rounded-full w-72 bg-frida-black  ${
              active ? 'text-frida-pink' : 'text-frida-white'
            }`}
          >
            <div className="flex items-center justify-between pr-1 font-bold">
              {label}
            </div>
          </button>

          {active && (
            <div className="absolute inset-0 flex items-start justify-end">
              <button
                className="mt-1 mr-3"
                onClick={() => {
                  onClick({ name: '', value: 'clear' })
                  setActiveItem(-1)
                  popupRemote.current && popupRemote.current.close()
                }}
              >
                <Icon size="s" icon="x" />
              </button>
            </div>
          )}
        </div>
      }
      position="bottom center"
    >
      <ul
        className={classNames(
          ' w-72  mt-4 p-0 list-none mx-2 z-20 rounded-lg  bg-frida-black',
          ' text-gray-700 transform transition-all duration-200  max-h-96 py-3',
          { 'overflow-y-scroll': items.length > 7 }
        )}
      >
        {items.map((item, index) => (
          <DropdownItem
            key={index}
            item={item}
            active={activeItem === index}
            activeItemChosen={activeItemChosen === index}
            onClick={() => {
              popupRemote.current && popupRemote.current.close()
              setActiveItem(index)
              onClick(item)
            }}
          />
        ))}
      </ul>
    </Popup>
  )
}

export default Dropdown
type DropdownItemProps = {
  item: { name: string; value: string }
  active: boolean
  activeItemChosen: boolean
  onClick: () => void
}
const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  active,
  onClick,
  activeItemChosen,
}) => {
  return (
    <li
      onClick={() => {
        onClick()
      }}
      onKeyPress={(e) => {
        console.log(e.key)
        if (activeItemChosen) {
          console.log(item)
        }
      }}
      className={classNames(
        'text-sm-fluid  duration-300 py-3 px-3  hover:bg-frida-white   hover:text-frida-black transition-colors font-bold',
        { 'text-frida-pink': active },

        { 'bg-frida-white text-frida-black': activeItemChosen },
        { 'bg-frida-black text-frida-white': !activeItemChosen }
        // { 'opacity-100': isOpen }
      )}
    >
      {item.name}
    </li>
  )
}
