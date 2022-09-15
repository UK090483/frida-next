import { useState, useCallback, useRef, useEffect } from 'react'

export function useAutoplay(callback: () => void, delay: number) {
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
