import FridaImage from '@components/fridaImage/FridaImage'
import photo from '@components/photo'
import cx from 'classnames'
import React from 'react'
import { FridaColors } from '../../types'
import { setMouse } from '../generic/Mouse/mouseRemote'

type SectionProps = {
  type?: 'text' | 'full' | 'hero' | 'normal' | 'medium-wide' | null
  backgroundColor?: FridaColors
  className?: string
  bgImage?: any
}

const Section: React.FC<SectionProps> = (props) => {
  const {
    children,
    backgroundColor = 'white',
    type = 'normal',
    className = '',
    bgImage,
  } = props

  return (
    <section
      onMouseOver={() => {
        backgroundColor === 'red'
          ? setMouse('color', true)
          : setMouse('color', false)
      }}
      className={cx(
        'relative',
        `bg-frida-${backgroundColor}`,
        {
          'min-h-screen flex flex-col justify-center': type === 'hero',
        },
        className
      )}
      data-color={backgroundColor}
    >
      {bgImage && (
        <FridaImage
          className="absolute top-0 bottom-0 left-0 right-0 "
          photo={bgImage}
          layout="fill"
        />
      )}

      <div
        className={cx(
          'relative',
          'frida-text-block',
          'w-full',
          'mx-auto',
          {
            'section_padding ': type === 'normal',
          },
          {
            'max-w-7xl px-5 ': type === 'medium-wide',
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
