import React from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { GalleryTypes } from 'types'

import Grid from './grid'

type GalleryProps = {
  items: React.ReactNodeArray
  type?: GalleryTypes
}
const load = 20

const Gallery: React.FC<GalleryProps> = ({ items, type = 'masonry' }) => {
  const [page, setPage] = React.useState(1)
  const hasNextPage = page * load < items.length

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
      <div className="grid grid-cols-1 md:grid-cols-3 section_padding ">
        {items.slice(0, page * load).map((item) => item)}
        {hasNextPage && <div ref={sentryRef}>Load </div>}
      </div>
    )
  }

  return (
    <>
      {/* <ArrowUp
        onClick={() => scrollTo("#filter")}
        className={`w-12 h-12 fixed bottom-6 right-6 bg-frida-pink rounded-full transform ${
          showScrollup ? "translate-x-0" : "translate-x-32"
        } `}
      /> */}

      {/* <div ref={gridRef}> */}

      <Grid>{items.slice(0, page * load).map((item) => item)}</Grid>
      {hasNextPage && <div ref={sentryRef}>Load </div>}

      {/* </div> */}
    </>
  )
}

export default Gallery
