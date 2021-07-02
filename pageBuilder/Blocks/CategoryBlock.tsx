import Category from '@components/Category'
import Photo from '@components/Photo'
import { PageBuilderBlockBase } from '../pageBuilderQueries'
import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import React from 'react'
import { FridaLocation } from 'types'

const categoryItem = `
...,
label,
label_en,
size,
'internalLink' :internalLink->{"type":_type,'slug':slug.current},
urlParams,
sizeMobile,
'images':images[]{${imageMeta}}

`

export const categoriesBlockQuery = `
_type == "categories" => {
  _type,
  type,
  'items':items[]{${categoryItem}},
}
`
type CategoryItem = {
  label?: string
  label_en?: string
  size?: 'm' | 's' | 'l'
  sizeMobile?: 'm' | 's' | 'l'
  internalLink?: { slug: string; type: string } | null
  urlParams?: string
  images?: ImageMetaResult[]
}
export interface CategoryBlockResult extends PageBuilderBlockBase {
  _type: 'categories'
  items: CategoryItem[]
}
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
              />
            )
          })
        : []),
    ],
  }))

  return <Category lang={lang} items={_items}></Category>
}

export default CategoryBlock
