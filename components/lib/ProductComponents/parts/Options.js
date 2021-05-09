import React from "react"
import DropDown from "../../input/Dropdown/DropdownWrap"
import styled from "styled-components"

const Options = ({ options, setOption, selectedOption }) => {
  const [state, setState] = React.useState("")

  const handleOptionChange = (name, value) => {
    let nextState = { ...selectedOption }
    nextState[name] = value
    setOption(nextState)
  }

  return (
    <Root>
      {options &&
        options.map(option => {
          const { name, values } = option

          return (
            <DropDown
              key={name}
              filterName={name}
              label={name}
              options={values.map(item => ({ label: item, value: item }))}
              open={state === name}
              setOpen={e => {
                setState(e)
              }}
              selected={selectedOption[name]}
              setFilter={(name, value) => {
                handleOptionChange(name, value)
              }}
            />
          )
        })}
    </Root>
  )
}

const Root = styled.div``

export default Options
