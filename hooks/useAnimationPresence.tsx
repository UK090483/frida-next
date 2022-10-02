import { useEffect, useState } from 'react'

export type useAnimationPresenceProps = {
  shouldRender: boolean
}

const useAnimationPresence = ({ shouldRender }: useAnimationPresenceProps) => {
  const [render, setRender] = useState(false)
  const [state, setState] = useState<'init' | 'in' | 'out'>('init')

  useEffect(() => {
    let timeout: null | NodeJS.Timeout = null
    if (shouldRender) {
      setRender(true)
      timeout = setTimeout(() => {
        setState('in')
      }, 1)
      return
    }
    if (!shouldRender && render) {
      setState('out')
      return
    }
  }, [shouldRender])

  const transitionDone = () => {
    if (state === 'out') {
      setRender(false)
      setState('init')
    }
  }

  return { render, state, transitionDone }
}

export default useAnimationPresence
