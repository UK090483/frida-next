import cx from 'classnames'
import React from 'react'
import { FridaColors } from '../types'
import { setMouse } from './generic/Mouse/mouseRemote'

type SectionProps = {
  type?: 'text' | 'full' | 'hero' | 'normal' | 'medium-wide' | null
  backgroundColor?: FridaColors
  className?: string
  bgImage?: any
  'data-testid'?: string
}

const Section: React.FC<SectionProps> = (props) => {
  const {
    children,
    backgroundColor = 'white',
    type = 'normal',
    className = '',
    // bgImage,
  } = props

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <section
      data-testid={props['data-testid']}
      onMouseOver={() => {
        backgroundColor === 'red'
          ? setMouse('color', true)
          : setMouse('color', false)
      }}
      className={cx(
        'relative',
        `bg-frida-${backgroundColor}`,
        { 'bg-frida-green': backgroundColor === 'green' },

        {
          'hero flex flex-col justify-center': type === 'hero',
        },
        className
      )}
      data-color={backgroundColor}
    >
      <div
        className={cx(
          'relative',
          'frida-text-block',
          'w-full',
          'mx-auto',
          {
            'px-frida_side  md:px-frida_7% ': type === 'normal',
          },
          {
            'px-frida_side max-w-7xl ': type === 'medium-wide',
          },
          {
            'px-frida_side  max-w-5xl md:px-5': type === 'text',
          },
          {
            'px-frida_7% mt-28': type === 'hero',
          }
        )}
      >
        {children}
      </div>
    </section>
  )
}

export default Section
