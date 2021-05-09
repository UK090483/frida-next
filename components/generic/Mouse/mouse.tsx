import React, { useEffect } from 'react'

import MouseClassNames from './classNames'
import { setMouse } from './mouseRemote'

export default function mouse() {
  const setMove = (e: MouseEvent) => {
    setMouse('move', e)
  }

  useEffect(() => {
    const body = document.querySelector('body')

    //@ts-ignore
    const MouseRef = { current: window.FridaMouse }
    const setMouseDown = () => {
      MouseRef.current &&
        MouseRef.current.classList.add(MouseClassNames.mouseDown)
    }
    const setMouseUp = () => {
      MouseRef.current &&
        MouseRef.current.classList.remove(MouseClassNames.mouseDown)
    }
    const setMouseIn = () => {
      MouseRef.current &&
        MouseRef.current.classList.remove(MouseClassNames.mouseOut)
    }
    const setMouseOut = () => {
      MouseRef.current &&
        MouseRef.current.classList.add(MouseClassNames.mouseOut)
    }

    body && body.addEventListener('mousemove', setMove)
    document.addEventListener('mousedown', setMouseDown)
    document.addEventListener('mouseup', setMouseUp)
    document.addEventListener('mouseenter', setMouseIn)
    document.addEventListener('mouseleave', setMouseOut)

    return () => {
      setMouse('reset')
      body && body.removeEventListener('mousemove', setMove)
      document.removeEventListener('mousedown', setMouseDown)
      document.removeEventListener('mouseup', setMouseUp)
      document.removeEventListener('mouseenter', setMouseIn)
      document.removeEventListener('mouseleave', setMouseOut)
    }
  }, [])

  return <></>
}
