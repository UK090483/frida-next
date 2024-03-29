/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import cx from 'classnames'

import Icon from '../Icon'

export function clampRange(value: number, min = 0, max = 1) {
  return value < min ? min : value > max ? max : value
}
const flipAnim = {
  show: {
    y: '0%',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
    },
  },
  hide: (custom: number) => ({
    y: `${-100 * custom}%`,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      when: 'afterChildren',
    },
  }),
  hideR: (custom: number) => ({
    y: `${100 * custom}%`,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      when: 'afterChildren',
    },
  }),
}

type ProductCounterProps = {
  id?: string
  defaultCount: number
  onUpdate: (count: number) => void
  max?: number
  className?: string
}

const ProductCounter: React.FC<ProductCounterProps> = ({
  id,
  defaultCount = 1,
  onUpdate,
  max = 10,
  className,
}) => {
  const [lineQuantity, setLineQuantity] = useState(defaultCount)

  const [direction, setDirection] = useState(1)
  const [motionKey, setMotionKey] = useState<number | string>(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const animateQuantity = useCallback((amount, direction) => {
    const count = max ? clampRange(amount, 1, max) : amount

    // Bail if at edges
    if (count < 1 || count > max) return

    setIsAnimating(true)
    setDirection(direction)
    setMotionKey(count + (direction > 0 ? '-up' : '-down'))
    setLineQuantity(count)

    if (onUpdate) {
      onUpdate(count)
    }
  }, [])

  const updateQuantity = useCallback((amount) => {
    const count = max ? clampRange(amount, 1, max) : amount

    if (count < 1) return

    setIsAnimating(false)
    setLineQuantity(count)

    if (onUpdate) {
      onUpdate(count)
    }
  }, [])

  useEffect(() => {
    setLineQuantity(defaultCount)
  }, [defaultCount])

  return (
    <div className={cx('counter', className)}>
      <Icon
        icon="minus"
        size="s"
        aria-label="Decrease quantity by one"
        onClick={() => animateQuantity(lineQuantity - 1, -1)}
      />

      <div className="counter--amount ">
        <AnimatePresence custom={direction}>
          <m.div
            key={motionKey}
            initial={isAnimating ? 'hideR' : 'show'}
            animate="show"
            exit="hide"
            variants={flipAnim}
            custom={direction}
            className="counter--input"
          >
            <input
              aria-label="Manually enter quantity"
              onChange={(e) =>
                updateQuantity(parseInt(e.currentTarget.value, 10))
              }
              onBlur={() => isNaN(lineQuantity) && updateQuantity(1)}
              type="number"
              inputMode="numeric"
              min="1"
              value={lineQuantity ? lineQuantity : ''}
            />
          </m.div>
        </AnimatePresence>
      </div>

      <Icon
        aria-label="Increase quantity by one"
        icon="plus"
        id={id}
        size="s"
        onClick={() => animateQuantity(lineQuantity + 1, 1)}
      />
    </div>
  )
}

export default React.memo(ProductCounter)
