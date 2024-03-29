import React from 'react'
import cx from 'classnames'

import { hasObject } from 'lib/helpers'
import RadioGroup, {
  RadioGroupValue,
} from '@components/ProductComponents/radio-group'
import RadioItem from '@components/radio-item'
import type {
  IProductOption,
  IProductOptionSetting,
  ProductVariant,
} from 'PageTypes/Product/ProductSingle.query'
import Swatch from 'components/ProductComponents/swatch'

type ProductOptionProps = {
  option: IProductOption
  optionSettings: IProductOptionSetting[] | undefined
  position: number
  variants: ProductVariant[]
  activeVariant: ProductVariant
  strictMatch?: boolean
  hideLabels?: boolean
  onChange: (val: string) => void
}

const ProductOption: React.FC<ProductOptionProps> = ({
  option,
  optionSettings,
  position,
  variants,
  activeVariant,
  strictMatch = true,
  hideLabels,
  onChange,
}) => {
  const otherOpts = [
    ...activeVariant.options.slice(0, position),
    ...activeVariant.options.slice(position + 1),
  ]

  const activeValue = activeVariant.options.find(
    (opt) => opt.name === option.name
  )

  return (
    <div
      key={position}
      className={`option is-${option.name.toLowerCase().replace(' ', '-')}`}
    >
      {!hideLabels && <div className="option--title">{option.name}</div>}
      <RadioGroup
        value={activeValue && activeValue.value}
        onChange={(value) => {
          changeOption(option.name, value, variants, activeVariant, onChange)
        }}
        className="option--values"
      >
        {option.values.map((value, key) => {
          const currentOpt = [{ name: option.name, value: value }]

          const optSettings = optionSettings?.find((settings) => {
            const optName = settings.forOption.split(':')[0]
            const optValue = settings.forOption.split(':')[1]
            return optName === option.name && optValue === value
          })

          const isActive = activeVariant.options.some(
            (opt) => opt.position === option.position && opt.value === value
          )

          const withActiveOptions = [...currentOpt, ...otherOpts]

          const hasVariants = variants.find((variant) =>
            variant.options.every((opt) => hasObject(withActiveOptions, opt))
          )

          const inStock = variants.find((variant) => {
            if (strictMatch) {
              return (
                variant.inStock &&
                variant.options.every((opt) =>
                  hasObject(withActiveOptions, opt)
                )
              )
            } else {
              return (
                variant.inStock &&
                variant.options.some((opt) => hasObject(currentOpt, opt))
              )
            }
          })

          return (
            <RadioItem
              key={key}
              value={value}
              className={cx({
                btn: !optSettings?.color,
                'option--swatch': optSettings?.color,
                'is-active': isActive,
                'is-unavailable': !hasVariants,
                'is-soldout': !inStock && hasVariants && !isActive,
              })}
            >
              {optSettings?.color ? (
                <Swatch
                  label={`Select "${value}" ${option.name} option`}
                  color={optSettings?.color}
                />
              ) : (
                <>{value}</>
              )}
            </RadioItem>
          )
        })}
      </RadioGroup>
    </div>
  )
}

// handle option changes
const changeOption = (
  name: string,
  value: RadioGroupValue,
  variants: ProductVariant[],
  activeVariant: ProductVariant,
  changeCallback: (val: string) => void
) => {
  const newOptions = activeVariant.options.map((opt) =>
    opt.name === name ? { ...opt, value: value } : opt
  )

  const newVariant = variants.find((variant) =>
    variant.options.every((opt) => hasObject(newOptions, opt))
  )

  if (newVariant && changeCallback) {
    changeCallback(newVariant.id)
  }
}

export default ProductOption
