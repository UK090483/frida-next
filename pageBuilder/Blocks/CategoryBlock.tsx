import Category from '@components/Category'
import Photo from '@components/photo'
import { PageBuilderBlockBase } from '../pageBuilderQueries'
import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import React from 'react'

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

const CategoryBlock: React.FC<CategoryBlockResult> = (props) => {
  const { items } = props

  if (!items) return <div></div>

  const _items = props.items.map((item) => ({
    ...item,
    images: [
      ...(item.images
        ? item.images.map((image) => (
            <Photo photo={image} layout="fill" className="w-full h-full" />
          ))
        : []),
    ],
  }))

  return <Category items={_items}></Category>
}

export default CategoryBlock
