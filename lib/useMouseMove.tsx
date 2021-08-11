import { useEffect, useState, useMemo } from 'react'

type Position = {
  x: number
  y: number
}
type useMouseMoveProps = {
  throttle: number
  targetPos?: 'page' | 'client'
  targetId?: string
}

function useMouseMove(props: useMouseMoveProps) {
  const { throttle, targetPos, targetId } = props
  const [pos, setPos] = useState({ x: 0, y: 0 })
  let prevPos = pos

  const preparedThrottle = useMemo(
    () => Math.max(1, Math.min(throttle, 10)),
    [throttle]
  )

  const throttlePos = (prevPos: Position, x: number, y: number) => {
    return {
      x: Math.abs(prevPos.x - x) % preparedThrottle === 0 ? x : prevPos.x,
      y: Math.abs(prevPos.y - y) % preparedThrottle === 0 ? y : prevPos.y,
    }
  }

  const moveHandler = (evt: MouseEvent) => {
    const { altKey, ctrlKey, metaKey, shiftKey } = evt

    const { x, y } = throttlePos(
      prevPos,
      //@ts-ignore
      evt[targetPos ? `${targetPos}X` : 'x'],
      //@ts-ignore
      evt[targetPos ? `${targetPos}Y` : 'y']
    )

    const nextPos = {
      x,
      y,
      keydown: {
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
      },
    }

    if (prevPos !== nextPos) {
      setPos(nextPos)
      prevPos = nextPos
    }
  }

  useEffect(() => {
    let targetElement: Window | HTMLElement | null = window
    if (targetId) {
      targetElement = document.getElementById(targetId)
    }
    if (!targetElement) return
    targetElement.addEventListener('mousemove', (e) => {
      moveHandler(e as MouseEvent)
    })
    return () => {
      if (!targetElement) return
      targetElement.removeEventListener('mousemove', (e) => {
        moveHandler(e as MouseEvent)
      })
    }
  }, [])

  return pos
}

export default useMouseMove
