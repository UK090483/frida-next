import React from 'react'
import classnames from 'classnames'

import { ArtworkRecord } from 'types'

type ProductNameProps = {
  availability: boolean
  name: ArtworkRecord['artworkName']
  size: 's' | 'm' | 'l'
  truncate?: boolean
  className?: string
}

const ProductName: React.FC<ProductNameProps> = ({
  availability,
  name = 'name missing',
  size = 'm',
  truncate = false,
  className = '',
}) => {
  const stringArray = [...name.split(' ')]
  const firstWord = stringArray.shift()
  const rest = stringArray.join(' ')

  return (
    <div
      className={classnames(
        { 'whitespace-nowrap  overflow-hidden truncate': truncate },
        { 'text-base-fluid font-bold  py-2': size === 'l' },
        { 'text-sm-fluid': size === 'm' },
        `${className}`
      )}
    >
      <span>
        <span
          className={classnames(
            ' inline-block rounded-full mr-2 ',
            { ' w-5 h-5 mb-0.5': size === 'l' },
            { ' w-4 h-4 -mb-0.5': size === 'm' },
            {
              'bg-frida-green': availability,
            },
            {
              'bg-frida-red': !availability,
            }
          )}
        ></span>
        {firstWord + ' '}
      </span>
      {rest}
    </div>
  )
}

export default ProductName
