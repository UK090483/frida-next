import useKeydown from 'hooks/useKeydown'
import React from 'react'
const optionHeight = 40
const maxItems = 8

type useSelectProps = {
  ref: React.MutableRefObject<HTMLDivElement | null>
  onChange: (value: string) => void
  items: { name: string; value: string }[]
}
const useSelect = ({ ref, onChange, items }: useSelectProps) => {
  const [state, setState] = React.useState({
    maxHeight: 0,
    hasFocus: false,
    selected: 0,
  })
  const { maxHeight, hasFocus, selected } = state

  const handleFocus = () => {
    setState({
      maxHeight: maxItems * optionHeight,
      hasFocus: true,
      selected: 0,
    })
  }
  const handleBlur = () => {
    setState({ maxHeight: 0, hasFocus: false, selected: 0 })
  }
  const handleClick = (value: string) => {
    onChange(value)
    blur()
  }

  const blur = () => {
    ref.current && ref.current.blur()
  }

  useKeydown({
    ArrowUp: (e) => {
      if (!hasFocus) return
      e.preventDefault()
      setState((oS) => ({
        ...oS,
        selected: oS.selected === 0 ? items.length - 1 : oS.selected - 1,
      }))
    },
    ArrowDown: (e) => {
      if (!hasFocus) return
      e.preventDefault()
      setState((oS) => ({ ...oS, selected: (oS.selected + 1) % items.length }))
    },
    Enter: () => {
      if (!hasFocus) return

      onChange(items[selected].value)
      blur()
    },
  })

  return {
    handleBlur,
    handleFocus,
    handleClick,
    maxHeight,
    hasFocus,
    selected,
    needScroll: items.length > maxItems,
  }
}

export default useSelect
