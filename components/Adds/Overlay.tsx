import React, { useEffect } from 'react'
import { FridaColors } from 'types'
import cx from 'classnames'
import useAnimation from '../helper/useAnimation'

type OverlayCTA = {
  color: FridaColors
  item: (close: () => void) => React.ReactElement
}

const OverlayCTA: React.FC<OverlayCTA> = ({ color = 'pink', item }) => {
  const { current, animate, shouldRender } = useAnimation(500)
  const close = () => {
    animate('out')
  }
  useEffect(() => {
    const timeOut = setTimeout(() => {
      animate('in')
    }, 1000)

    return () => {
      clearTimeout(timeOut)
    }
  }, [])

  return (
    <>
      {shouldRender && (
        <div
          className={cx(
            `w-vw h-vh backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10 flex items-center justify-center fixed bottom-0 z-50 duration-500 transition-opacity bg-frida-${color}`,
            { 'opacity-100': current },
            { 'opacity-0': !current }
          )}
        >
          {item(close)}
        </div>
      )}
    </>
  )
}

export default OverlayCTA
