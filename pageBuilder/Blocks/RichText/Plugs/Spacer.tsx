import React from 'react'
import classNames from 'classnames'

export const seoHeaderPlugQuery = ` 
_type == "spacer" => {
  _type,
 size,
}
`
export type SpacerPlugResult = {
  _type: 'spacer'
  _key: string
  size: 's' | 'm' | 'l' | 'xl' | 'xxl'
}

const SpacerPlug: React.FC<SpacerPlugResult> = (props) => {
  const { size } = props

  return (
    <div
      className={classNames(
        { 'pb-10': size === 's' },
        { 'pb-20': size === 'm' },
        { 'pb-32': size === 'l' },
        { 'pb-44': size === 'xl' },
        { 'pb-60': size === 'xxl' }
      )}
    ></div>
  )
}

export default SpacerPlug
