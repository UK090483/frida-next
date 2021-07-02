import Photo from '@components/Photo'
import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'
import classNames from 'classnames'
import React from 'react'

export const imageGalleryPlugQuery = ` 
_type == "imageGalleryPlug" => {
  ...,
  _type,
  _key,
  'items':items[]{${imageMeta}},
  rows,
  rows_mobile,
  ratio,
  
}
`
export interface ImageGalleryPlugResult {
  _type: 'imageGalleryPlug'
  _key: string
  items: ImageMetaResult[]

  rows?: number
  rows_mobile?: number
  ratio: '1:1' | '16:9' | '2:3' | '3:2'
  photo: any
}

const ImageGalleryPlug: React.FC<ImageGalleryPlugResult> = (props) => {
  const { items, rows = 4, rows_mobile = 2, ratio = '1:1' } = props

  if (!items || items.length < 1) return <div>No Images</div>
  return (
    <div
      className={classNames(
        'grid grid-flow-row gap-2',
        { 'grid-cols-1': rows_mobile === 1 },
        { 'grid-cols-2': rows_mobile === 2 },
        { 'grid-cols-3': rows_mobile === 3 },
        { 'grid-cols-4': rows_mobile === 4 },
        { 'grid-cols-5': rows_mobile === 5 },
        { 'grid-cols-6': rows_mobile === 6 },
        { 'grid-cols-7': rows_mobile === 7 },
        { 'grid-cols-8': rows_mobile === 8 },
        { 'md:grid-cols-1': rows === 1 },
        { 'md:grid-cols-2': rows === 2 },
        { 'md:grid-cols-3': rows === 3 },
        { 'md:grid-cols-4': rows === 4 },
        { 'md:grid-cols-5': rows === 5 },
        { 'md:grid-cols-6': rows === 6 },
        { 'md:grid-cols-7': rows === 7 },
        { 'md:grid-cols-8': rows === 8 }
      )}
    >
      {items.map((photo) => {
        return (
          <Photo
            key={photo.id}
            srcSizes={[300]}
            photo={photo}
            layout="fill"
            className={classNames(
              'w-full ',
              {
                'aspect-w-10 aspect-h-10': ratio === '1:1',
              },
              {
                'aspect-w-16 aspect-h-9': ratio === '16:9',
              },
              {
                'aspect-w-3 aspect-h-2': ratio === '3:2',
              },
              {
                'aspect-w-2 aspect-h-3': ratio === '2:3',
              }
            )}
          />
        )
      })}
    </div>
  )
}

export default ImageGalleryPlug
