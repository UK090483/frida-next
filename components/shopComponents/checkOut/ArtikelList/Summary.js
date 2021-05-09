import React from "react"
import styled from "styled-components"

export default function Summary({ sum, tax }) {
  return (
    <Root>
      <List>
        {/* <ListItem>
          <span>MwSt(16%):</span>
          <span>{tax}€</span>
        </ListItem> */}
        <ListItem>
          <span>GESAMTBETRAG: </span> <span>{sum}€</span>
        </ListItem>
      </List>
    </Root>
  )
}

// const Head = styled.div`
//   font-weight: 700;
//   border-bottom: black 1px solid;
// `

// const Seperator = styled.div`
//   width: 100%;
//   border: black solid 1px;
// `

const List = styled.ul`
  width: 100%;

  height: 100%;
  list-style: none;
  padding-left: 0;
`
const ListItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`

const Root = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`
