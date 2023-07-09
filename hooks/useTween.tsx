import { useCallback, useRef, useState } from 'react'

type TimingFunction = (t: number) => number

export const timing = {
  linear: (t: number) => t,
  easeInOutQuad: makeEaseInOut((t) => t ** 2),
  easeInOutCubic: makeEaseInOut((t) => t ** 3),
  easeInOutQuart: makeEaseInOut((t) => t ** 4),
  easeInOutQuint: makeEaseInOut((t) => t ** 5),
}

function makeEaseInOut(timing: TimingFunction): TimingFunction {
  return function (t: number) {
    if (t < 0.5) return timing(2 * t) / 2
    else return (2 - timing(2 * (1 - t))) / 2
  }
}

export default function useTween(
  initial: number,
  { easing = timing.easeInOutQuad, duration = 550 } = {}
): [number, (to: number) => void] {
  const raf = useRef<number | null>(null)
  const [state, setState] = useState(initial)

  const setTween = useCallback(
    function setTween(to: number) {
      if (raf.current) cancelAnimationFrame(raf.current)

      let t0: number
      function animate(t: number) {
        t0 = t0 || t
        const delta = (t - t0) / duration,
          progress = Math.min(1, delta)

        setState((state) => state + (to - state) * easing(progress))

        if (progress < 1) raf.current = requestAnimationFrame(animate)
        else raf.current = null
      }

      raf.current = requestAnimationFrame(animate)
    },
    [duration, easing]
  )

  return [state, setTween]
}
