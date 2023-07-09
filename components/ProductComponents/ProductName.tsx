import React from 'react'
import classnames from 'classnames'

import { ArtworkRecord } from 'types'
import { ConditionalWrapper } from 'lib/helpers'

type ProductNameProps = {
  availability: boolean
  name: ArtworkRecord['artworkName']
  size: 's' | 'm' | 'l'
  truncate?: boolean
  className?: string
  asH1?: boolean
  hiddenBefore?: string
  hiddenAfter?: string
}

const ProductName: React.FC<ProductNameProps> = ({
  availability,
  name = 'name missing',
  size = 'm',
  truncate = false,
  className = '',
  hiddenBefore,
  hiddenAfter,
  asH1 = false,
}) => {
  const stringArray = [...name.split(' ')]
  const firstWord = stringArray.shift()
  const rest = stringArray.join(' ')

  return (
    <div
      data-testid={'productName'}
      className={classnames(
        { 'whitespace-nowrap  overflow-hidden truncate': truncate },
        { 'text-base-fluid font-bold  py-2': size === 'l' },
        { 'text-sm-fluid': size === 'm' },
        `${className}`
      )}
    >
      <ConditionalWrapper
        condition={asH1}
        wrapper={(children) => <h1>{children}</h1>}
      >
        <span
          className={classnames(
            'relative before:absolute ml-[1em]',
            'before:rounded-full before:top-1/2 before:-translate-y-1/2',
            'before:w-[0.7em] before:h-[0.7em] before:translate-x-[-1em]',
            {
              'before:bg-frida-green': availability,
            },
            {
              'before:bg-frida-red': !availability,
            }
          )}
        >
          {hiddenBefore && (
            <span className="inline-block overflow-hidden max-w-0 max-h-0 ">
              {hiddenBefore}
            </span>
          )}
          {firstWord + ' '}
        </span>
        {rest}
        {hiddenAfter && (
          <span className="inline-block overflow-hidden max-w-0 max-h-0 ">
            {hiddenAfter}
          </span>
        )}
      </ConditionalWrapper>
    </div>
  )
}

export default ProductName
