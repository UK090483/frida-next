import Category from '@components/Category'
import Photo from '@components/Photo'

import React from 'react'
import { FridaLocation } from 'types'
import { CategoryBlockResult } from './CategoryBlock.query'

interface CategoryBlockProps extends CategoryBlockResult {
  lang: FridaLocation
}

const sizes = {
  s: '(min-width: 640px) 20vw ,50vw',
  m: '(min-width: 640px) 40vw ,100vw',
  l: '(min-width: 640px) 50vw ,100vw',
}

const getSize = (size?: 's' | 'm' | 'l') => {
  if (!size) return '(min-width: 640px) 50vw ,100vw'

  return sizes[size]
}
const CategoryBlock: React.FC<CategoryBlockProps> = (props) => {
  const { items, lang } = props

  if (!items) return <div></div>

  const _items = props.items.map((item) => ({
    ...item,
    images: [
      ...(item.images
        ? item.images.map((image) => {
            return (
              <Photo
                sizes={getSize(item.size)}
                key={image.id}
                photo={image}
                layout="fill"
                maxWidth={800}
              />
            )
          })
        : []),
    ],
  }))

  return <Category lang={lang} items={_items}></Category>
}

export default CategoryBlock
