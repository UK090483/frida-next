import React from 'react'
type UseObjectFitProps = {
  fitRef: React.MutableRefObject<HTMLElement | null>
  containerRef: React.MutableRefObject<HTMLElement | null>
  fitRatio: number
  type: 'contain' | 'fill'
}

const high = {
  height: '100%',
  width: 'auto',
}
const land = { height: 'auto', width: '100%' }

function useObjectFit(props: UseObjectFitProps) {
  const { fitRef, containerRef, fitRatio, type } = props

  React.useEffect(() => {
    const fit = fitRef.current
    const container = containerRef.current
    if (!fit || !container) return

    const runContain = () => {
      const cRatio = rect(container).ratio
      const fRatio = fitRatio || rect(fit).ratio
      if (cRatio > fRatio) {
        setStyles(fit, high)
      } else {
        setStyles(fit, land)
      }
    }
    const runFill = () => {
      const { ratio: cRatio, height } = rect(container)
      const fRatio = fitRatio || rect(fit).ratio

      if (cRatio > fRatio) {
        setStyles(fit, { width: '100%', height: 'auto', minWidth: null })
      } else {
        setStyles(fit, {
          height: '100%',
          minWidth: `${height * fRatio}px`,
          width: null,
        })
      }
      container.style.overflow = 'hidden'
    }

    const run = () => {
      switch (type) {
        case 'contain':
          runContain()
          break
        case 'fill':
          runFill()
          break
        default:
          break
      }
      setStyles(container, { opacity: '100' })
    }

    run()
    window.addEventListener('resize', run)
    return () => {
      window.removeEventListener('resize', run)
    }
  }, [fitRef, containerRef, fitRatio, type])
}

const rect = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()

  return { ratio: rect.width / rect.height, height: rect.height }
}

const setStyles = (
  element: HTMLElement,
  styles: { [K: string]: string | null }
) => {
  Object.entries(styles).forEach(([key, val]) => {
    //@ts-ignore
    element.style[key] = val
  })
}

export default useObjectFit
