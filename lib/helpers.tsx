// @ts-nocheck

import { useEffect, useState } from 'react'

//client-side mount
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

export const ConditionalWrapper: React.FC<{
  condition: boolean
  wrapper: (children: ReactNode) => React.ReactElement
}> = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children
}

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

export function wrap(index: number, length: number) {
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
