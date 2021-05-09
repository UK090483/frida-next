import React from "react"
import styled from "styled-components"
import ArtikelList from "./ArtikelList/ArtikelList"

export default function CheckOut({ closeTo }) {
  return (
    <Root>
      <div data-color="white">
        <Header>Warenkorb</Header>
        <ArtikelList />
      </div>
    </Root>
  )
}

const Header = styled.h3`
  text-align: center;
  padding-bottom: 100px;
`

const Root = styled.div`
  width: 100%;
  padding-top: 150px;
`
