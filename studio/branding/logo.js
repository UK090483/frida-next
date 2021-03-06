import React from 'react'
import styled, { css } from 'styled-components'
import Image from './frida_logo.png'
const Logo = ({ projectName }) => {
  return (

    <Icon src={Image}/>
    
  )
}

const Icon = styled.img`
  display: block;
  width: auto;
  height: 2em;
  max-width: 100%;
  margin: -1em auto;
  color: white;

  ${props =>
    props.isLogin &&
    css`
      display: block;
      margin: 0 auto;
      height: 4em;
      color: black;
    `}

  svg {
    display: block;
    margin: 0 auto;
    height: 100%;
    width: auto;
    fill: currentColor;
  }
`

export default Logo
