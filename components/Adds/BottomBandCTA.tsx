import React, { useState, useEffect } from 'react'

import { mouseLinkProps } from '../generic/Mouse/mouseRemote'
import cx from 'classnames'
import { FridaColors } from 'types'

type BottomBandCTA = {
  link: string
  text: string
  color: FridaColors
}

const BottomBandCTA: React.FC<BottomBandCTA> = ({
  link,
  text,
  color = 'pink',
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 1000)
  }, [])

  return (
    <a
      {...mouseLinkProps}
      href={link}
      target="_blank"
      rel="noreferrer"
      className={cx(
        `w-vw flex items-center justify-center fixed bottom-0 z-50 transform transition-all bg-frida-${color}`,
        { 'translate-y-0': show },
        { 'translate-y-full': !show }
      )}
    >
      <div
        className={cx(
          'text-lg-fluid font-bold',
          {
            'text-frida-white hover:text-frida-red': color === 'pink',
          },
          {
            'text-frida-white hover:text-frida-black': color === 'red',
          },
          {
            'text-frida-white hover:text-frida-red': color === 'black',
          },
          {
            'text-frida-black hover:text-frida-red': color === 'white',
          }
        )}
      >
        {text}
      </div>
    </a>
  )
}

export default BottomBandCTA
