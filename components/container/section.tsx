import cx from 'classnames'
import React from 'react'
import { FridaColors } from '../../types'
import { setMouse } from '../generic/Mouse/mouseRemote'

type SectionProps = {
  type?: 'text' | 'full' | 'hero'
  backgroundColor?: FridaColors
  className?: string
}

const Section: React.FC<SectionProps> = (props) => {
  const {
    children,
    backgroundColor = 'white',
    type = 'default',
    className = '',
  } = props

  return (
    <section
      onMouseOver={() => {
        backgroundColor === 'red'
          ? setMouse('color', true)
          : setMouse('color', false)
      }}
      className={cx(
        `bg-frida-${backgroundColor}`,
        {
          'min-h-screen flex flex-col justify-center': type === 'hero',
        },
        className
      )}
      data-color={backgroundColor}
    >
      <div
        className={cx(
          'frida-text-block ',
          'w-full',
          'mx-auto',
          {
            section_padding: type === 'default',
          },
          {
            'max-w-5xl px-5': type === 'text',
          },
          {
            'section_padding mt-28': type === 'hero',
          }
        )}
      >
        {children}
      </div>
    </section>
  )
}

export default Section
