//@ts-nocheck
import { useCallback, useEffect, useRef, useState } from 'react'

//client-side mount
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

// autoplay looper
export function useAutoplay(callback, delay) {
  const [isRunning, setIsRunning] = useState(false)
  const stop = useCallback(() => setIsRunning(false), [setIsRunning])
  const play = useCallback(() => setIsRunning(true), [setIsRunning])
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (!isRunning) return
    let id: 0 | NodeJS.Timeout = 0

    const tick = () => {
      if (!isRunning && id) return clearTimeout(id)
      savedCallback.current()
      requestAnimationFrame(() => (id = setTimeout(tick, delay)))
    }
    requestAnimationFrame(() => (id = setTimeout(tick, delay)))

    return () => {
      if (id) clearTimeout(id)
      stop()
    }
  }, [isRunning, delay, stop])

  return { play, stop }
}

// conditionally wrap a component with another
export const ConditionalWrapper: React.FC<{
  condition: boolean
  wrapper: (children: ReactNode) => React.ReactElement
}> = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children
}

// delay with promise
// export function sleeper(ms) {
//   return function (x) {
//     return new Promise((resolve) => setTimeout(() => resolve(x), ms))
//   }
// }

// check if value is unique
// export const unique = (value, index, self) => {
//   return self.indexOf(value) === index
// }

// see if an object is found in another array of objects
export function hasObject(recs, vals) {
  if (!recs) return false

  return recs.some(function (obj) {
    for (const x in obj) if (x in vals && obj[x] != vals[x]) return false
    return true
  })
}

// keep number counters within a range
export function clampRange(value, min = 0, max = 1) {
  return value < min ? min : value > max ? max : value
}

// wrap incremental
export function wrap(index, length) {
  if (index < 0) {
    index = length + (index % length)
  }
  if (index >= length) {
    return index % length
  }
  return index
}

// convert cents to dollars, optional trailing zeros if round amount
export function centsToPrice(cents, trailing = false) {
  const price = cents / 100

  if (!trailing && price % 1 === 0) {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  } else {
    const parts = price.toFixed(2).split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return `${parts.join('.')}`
  }
}

/*  ------------------------------ */
/*  Client helpers
/*  ------------------------------ */

export const Keys = {
  ENTER: 13,
  SPACE: 32,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  RETURN: 45,
}
