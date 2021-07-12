import React from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useIntersection } from 'react-use'
import { GalleryTypes } from 'types'
import Icon from '../Icon'

import Grid from './grid'

type GalleryProps = {
  items: React.ReactNodeArray
  type?: GalleryTypes
}
const load = 20

const Gallery: React.FC<GalleryProps> = ({ items, type = 'masonry' }) => {
  const [page, setPage] = React.useState(1)
  const hasNextPage = page * load < items.length
  const gridRef = React.useRef<null | HTMLDivElement>(null)
  const intersecting = useIntersection(gridRef, {})
  const showScrollUp = intersecting && intersecting.boundingClientRect.top < 0

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage,
    onLoadMore: () => {
      setPage(page + 1)
    },
    disabled: false,
    rootMargin: '0px 0px 1000px 0px',
  })

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 md:gap-12 lg:gap-16 md:grid-cols-2  lg:grid-cols-3 md:px-frida_7%">
        {items.slice(0, page * load).map((item) => item)}
        {hasNextPage && <div ref={sentryRef}>Load </div>}
      </div>
    )
  }

  return (
    <>
      <Icon
        bgColor="pink"
        icon="arrowLeft"
        onClick={() => {
          if (gridRef.current) {
            window.scrollTo({
              top: gridRef.current.offsetTop - 400,
              behavior: 'smooth',
            })
          }
        }}
        className={`fixed bottom-3 right-3  md:right-3 transform-gpu rotate-90  ease-in-out duration-500 transition-transform z-10 ${
          showScrollUp ? 'translate-x-0 ' : 'translate-x-60 '
        } `}
      />

      <div ref={gridRef}></div>
      <Grid>{items.slice(0, page * load).map((item) => item)}</Grid>
      {hasNextPage && <div ref={sentryRef}>Load </div>}
    </>
  )
}

export default Gallery
