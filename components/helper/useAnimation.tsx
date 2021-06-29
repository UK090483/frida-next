import { useEffect, useState } from 'react'

type useAnimationState = {
  direction: 'in' | 'out' | null
  isAnimating: boolean
  current: boolean
  shouldRender: boolean
  setCurrent: boolean
}
const useAnimation = (time: number) => {
  const [state, setState] = useState<useAnimationState>({
    direction: null,
    isAnimating: false,
    current: false,
    shouldRender: false,
    setCurrent: false,
  })

  const { direction, isAnimating, current, shouldRender, setCurrent } = state

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined
    if (isAnimating)
      timeout = setTimeout(() => {
        setState((state) => ({
          ...state,
          isAnimating: false,
          direction: null,
          ...(state.direction === 'out' ? { shouldRender: false } : {}),
        }))
      }, time)
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [isAnimating, time])

  useEffect(() => {
    if (current === setCurrent) return
    setTimeout(() => {
      setState((state) => ({
        ...state,
        current: setCurrent,
      }))
    }, 10)
  }, [setCurrent, current])

  const animate = (direction: 'in' | 'out' | 'toggle') => {
    switch (direction) {
      case 'toggle':
        setState((state) => ({
          ...state,
          current: !current,
          isAnimating: true,
        }))
        break
      case 'in':
        setState((state) => ({
          ...state,
          isAnimating: true,
          shouldRender: true,
          setCurrent: true,
          direction: 'in',
        }))

        break
      case 'out':
        setState((state) => ({
          ...state,
          current: false,
          isAnimating: true,
          direction: 'out',
        }))
        break

      default:
        break
    }
  }

  return {
    isAnimating,
    animate,
    direction,
    current,
    shouldRender,
  }
}

export default useAnimation
