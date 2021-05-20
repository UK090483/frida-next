import React from 'react'
import classnames from 'classnames'

import { ArtworkRecord } from 'types'

type ProductNameProps = {
  availability: boolean
  name: ArtworkRecord['artworkName']
  size: 's' | 'm' | 'l'
}

const ProductName: React.FC<ProductNameProps> = ({
  availability,
  name = 'name missing',
  size = 'm',
}) => {
  const stringArray = [...name.split(' ')]
  const firstWord = stringArray.shift()
  const rest = stringArray.join(' ')

  return (
    <div
      className={classnames(
        { 'text-base-fluid font-bold pb-6 pt-2': size === 'l' },
        { 'text-sm-fluid  pb-6': size === 'm' }
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
