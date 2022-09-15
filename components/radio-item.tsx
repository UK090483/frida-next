import { useRef, useEffect, KeyboardEvent } from 'react'

import { wrap, Keys } from '@lib/helpers'
import {
  RadioGroupValue,
  useRadioGroupContext,
  useRadioItemContext,
} from '@components/ProductComponents/radio-group'

interface IRadioItemProps {
  value: RadioGroupValue
  children: React.ReactNode
  className: string
}

const RadioItem: React.FC<IRadioItemProps> = ({ value, children, ...rest }) => {
  const groupContext = useRadioGroupContext()
  const itemContext = useRadioItemContext()

  const isChecked = groupContext.value === value
  const itemRef = useRef<HTMLButtonElement | null>(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (isChecked) {
      itemRef.current && itemRef.current.focus()
    }
  }, [isChecked])

  function handleClick() {
    groupContext.onChange(value)
  }

  function handleKeyDown(ev: KeyboardEvent<HTMLButtonElement>) {
    const { items, onChange } = groupContext
    const index = itemContext

    let flag = false

    // listen for one of our key presses
    switch (ev.keyCode) {
      case Keys.SPACE:
      case Keys.RETURN: {
        onChange(value)
        flag = true
        break
      }

      case Keys.UP:
      case Keys.LEFT: {
        //@ts-ignore
        onChange(items[wrap(index - 1, items.length)].props.value)
        flag = true
        break
      }

      case Keys.DOWN:
      case Keys.RIGHT: {
        //@ts-ignore
        onChange(items[wrap(index + 1, items.length)].props.value)
        flag = true
        break
      }

      default:
        break
    }

    // if one of our keys were pressed (flagged), prevent default behavior
    if (flag) {
      ev.stopPropagation()
      ev.preventDefault()
    }
  }

  return (
    <button
      ref={itemRef}
      role="radio"
      tabIndex={isChecked ? 0 : -1}
      aria-checked={isChecked}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </button>
  )
}

export default RadioItem
