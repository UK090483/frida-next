import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { setMouse } from "../generic/Mouse/mouseRemote"

export default function TeilnehmenCTA({ link }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 500)
  }, [])

  return (
    <Root show={show}>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => {
          setMouse("link", true)
        }}
        onMouseLeave={() => {
          setMouse("link", false)
        }}
      >
        <h2>Jetzt teilnehmen</h2>
      </a>
    </Root>
  )
}

const Root = styled.div`
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.pink};
  position: fixed;
  bottom: 0;
  z-index: 1;

  transition: bottom 1s;
  bottom: ${({ show }) => (show ? "0%" : "-100%")};

  a {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    h2 {
      margin: 0;
      color: ${({ theme }) => theme.colors.white};
      transition: color 0.3s;
    }
    cursor: none;
  }
  &:hover {
    a {
      h2 {
        transition: color 0.3s;
        color: ${({ theme }) => theme.colors.red};
      }
    }
  }
`
