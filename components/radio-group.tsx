import React, { createContext, useContext } from 'react'
import flattenChildren from 'react-keyed-flatten-children'

// Create radio contexts

export type RadioGroupValue = string | number | null | undefined
interface IRadioGroupContext {
  value: RadioGroupValue
  items: null | React.ReactChild[]
  onChange: (value: RadioGroupValue) => void
}
const RadioGroupContext = createContext<IRadioGroupContext>({
  value: null,
  items: null,
  onChange: () => null,
})
const RadioItemContext = createContext<number | null>(null)

// Export radio context hooks
export const useRadioGroupContext = () => useContext(RadioGroupContext)
export const useRadioItemContext = () => useContext(RadioItemContext)

interface IRadioGroupProps {
  value: RadioGroupValue
  onChange: (value: RadioGroupValue) => void
  children: React.ReactNode
  className: string
  [k: string]: unknown
}

const RadioGroup: React.FC<IRadioGroupProps> = ({
  value,
  onChange = () => {
    return
  },
  children,
  className,
  ...props
}) => {
  const items = flattenChildren(children)

  return (
    <RadioGroupContext.Provider value={{ value, items, onChange }}>
      <div role="radiogroup" className={className} {...props}>
        {items.map((child, index) => (
          <RadioItemContext.Provider key={index} value={index}>
            {child}
          </RadioItemContext.Provider>
        ))}
      </div>
    </RadioGroupContext.Provider>
  )
}

export default RadioGroup
