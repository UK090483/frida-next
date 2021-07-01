import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import Photo from '@components/photo'
import { ImageMetaResult } from '@lib/queries/snippets'
import {
  ProductSingleViewResult,
  ProductGalleryPhotos,
} from 'contentTypes/Product/ProductSingle'
import * as React from 'react'

interface IProductImageGalleryProps {
  product: ProductSingleViewResult
  activePhoto: ImageMetaResult | null | undefined
  onChange: (variantId: string, photo: ImageMetaResult) => void
}

const ProductImageGallery: React.FunctionComponent<IProductImageGalleryProps> =
  (props) => {
    const { activePhoto, onChange } = props
    const { galleryPhotos, variants } = props.product

    const photosIncVariantsId = variants.reduce((acc, item) => {
      const o = item.options.map((i) => `${i.name}:${i.value}`)
      const res = galleryPhotos?.filter((i) => {
        return o.includes(i.forOption)
      })
      return { ...acc, [item.id]: res }
    }, {} as { [k: string]: ProductGalleryPhotos[] | undefined })

    return (
      <div className={`flex h-24 flex-shrink-0`}>
        {Object.entries(photosIncVariantsId).map(([id, item]) => {
          if (!item) return []
          return item.map((image) => {
            if (!image) return []
            return image.photos.map((photo, index) => {
              const isActive = activePhoto && activePhoto.id === photo.id
              return (
                <button
                  {...mouseLinkProps}
                  key={index}
                  className={`relative m-2 w-20 h-20 ${
                    isActive ? 'border-frida-red border-3' : ''
                  }`}
                  onClick={() => {
                    onChange(id, photo)
                  }}
                >
                  <Photo photo={photo} layout="fill" />
                </button>
              )
            })
          })
        })}
      </div>
    )
  }

export default ProductImageGallery
