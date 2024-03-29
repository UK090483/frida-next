import React from 'react'
import classNames from 'classnames'

type PriceProps = {
  price: string | number
  size?: 's' | 'm' | 'l'
  currency?: '€' | ' ETH'
}

const Price: React.FC<PriceProps> = ({
  price = 0,
  size = 'm',
  currency = '€',
}) => {
  return (
    <div
      data-testid={'productPrice'}
      className={classNames(
        ' flex items-center leading-none whitespace-nowrap',
        { 'text-base-fluid font-bold h-9': size === 'm' },
        { 'text-sm-fluid h-6': size === 's' }
      )}
    >
      {currency === ' ETH' && <EthIcon size={size} />}
      {price}
      {currency}
    </div>
  )
}

export default Price

const EthIcon: React.FC<{ size: 'm' | 's' | 'l' }> = () => {
  return (
    <svg
      className="h-full py-0.5 pr-1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 33 53"
      fill="none"
    >
      <path
        d="M16.3576 0.666687L16.0095 1.85009V36.1896L16.3576 36.5371L32.2976 27.115L16.3576 0.666687Z"
        fill="#343434"
      />
      <path
        d="M16.3578 0.666687L0.417816 27.115L16.3578 36.5372V19.8699V0.666687Z"
        fill="#8C8C8C"
      />
      <path
        d="M16.3575 39.5552L16.1613 39.7944V52.0268L16.3575 52.6L32.307 30.1378L16.3575 39.5552Z"
        fill="#3C3C3B"
      />
      <path
        d="M16.3578 52.5998V39.5551L0.417816 30.1377L16.3578 52.5998Z"
        fill="#8C8C8C"
      />
      <path
        d="M16.3575 36.537L32.2973 27.1151L16.3575 19.8699V36.537Z"
        fill="#141414"
      />
      <path
        d="M0.417816 27.1151L16.3576 36.537V19.8699L0.417816 27.1151Z"
        fill="#393939"
      />
    </svg>
  )
}
