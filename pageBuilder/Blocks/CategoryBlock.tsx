import React from 'react'
import Category from '@components/category/Category'
import ImageParser from '../ImageParser'

type CategoryBlockProps = {
  content: any
}

const CategoryBlock: React.FC<CategoryBlockProps> = (props) => {
  if (!props.content) return <></>

  const items = props.content.map((item: any) => ({
    label: item.label,
    size: item.size,
    images: [
      ...(item.images
        ? item.images.map((image: any) => (
            <ImageParser
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              image={image}
            />
          ))
        : []),
    ],
  }))

  return <Category items={items}></Category>
}

export default CategoryBlock
