import React from 'react'
import classNames from 'classnames'

type PriceProps = {
  price: string | number
  size?: 's' | 'm' | 'l'
}

const Price: React.FC<PriceProps> = ({ price, size = 'm' }) => {
  return (
    <div
      className={classNames(
        { 'text-base-fluid font-bold': size === 'm' },
        { 'text-sm-fluid font-bold': size === 's' }
      )}
    >
      {price}€
    </div>
  )
}

export default Price
