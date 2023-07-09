import { RefObject, useEffect, useRef } from 'react'

type useTweenCssProps = {
  tween: boolean
  refNode: RefObject<HTMLDivElement>
  initValue?: number
  toValue?: number
  done?: () => void
}
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

const duration = 200

const easing = timing.easeInOutQuad

const useTweenCss = (props: useTweenCssProps) => {
  const { tween, refNode, initValue = 1, toValue = 0, done = () => {} } = props
  const firstRender = useRef(true)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    if (raf.current) cancelAnimationFrame(raf.current)

    let t0: number
    let to = tween ? initValue : toValue
    let state = tween ? toValue : initValue

    function animate(t: number) {
      t0 = t0 || t
      const delta = (t - t0) / duration
      const progress = Math.min(1, delta)
      //   console.log({ delta, progress })

      const value = state + (to - state) * easing(progress)

      if (refNode.current) {
        //@ts-ignore
        refNode.current.style['opacity'] = value
      }

      console.log(value)

      if (progress < 1) {
        raf.current = requestAnimationFrame(animate)
      } else {
        raf.current = null
        done()
      }
    }

    raf.current = requestAnimationFrame(animate)
  }, [tween])
}

export default useTweenCss

type TimingFunction = (t: number) => number
