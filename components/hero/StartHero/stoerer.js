import React from "react"
import Section from "../../container/section"
import StoererSVG from "../../../assets/Störer_Newsletter.svg"
import { Link } from "gatsby"
import useMouse from "../../generic/Mouse/hooks/useMouse"
import styled, { keyframes } from "styled-components"
import scrollTo from "gatsby-plugin-smoothscroll"

export default function Stoerer() {
  const { setMouse } = useMouse()

  return (
    <React.Fragment>
      <Root
        onMouseEnter={() => {
          setMouse("link", true)
        }}
        onMouseLeave={() => {
          setMouse("link", false)
        }}
      >
        <Link
          to="/"
          onClick={e => {
            e.preventDefault()
            scrollTo("#newsletter")
          }}
        >
          <StoererSVG />
        </Link>
      </Root>

      <Section>
        <Spacer></Spacer>
      </Section>
    </React.Fragment>
  )
}
const spin = keyframes`
 from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Root = styled.div`
  transform: translateY(-66.66%);
  right: 30px;
  width: 150px;
  position: absolute;
  margin-bottom: 100px;
  overflow: hidden;
  z-index: 10;

  a {
    cursor: none;
  }

  svg {
    animation-name: ${spin};
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
  }
  @media ${({ theme }) => theme.device.tablet} {
    right: 7%;
    width: 300px;
  }
  @media ${({ theme }) => theme.device.laptop} {
    right: 7%;
    width: 400px;
  }
`
const Spacer = styled.div`
  height: 75px;
  @media ${({ theme }) => theme.device.tablet} {
    height: 150px;
  }
  @media ${({ theme }) => theme.device.laptop} {
    height: 200px;
  }
`
