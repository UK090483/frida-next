import React from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import ArtworkCard, { ArtworkCardProps } from '../artworkCard/ArtworkCard'
import Grid from './grid'

type ArtworkContainerProps = {
  artworks: ArtworkCardProps['artwork'][]
}
const load = 20

const ArtworkContainer: React.FC<ArtworkContainerProps> = ({ artworks }) => {
  const [page, setPage] = React.useState(1)
  const hasNextPage = page * load < artworks.length
  const items = artworks.slice(0, page * load)

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage,
    onLoadMore: () => {
      setPage(page + 1)
    },
    disabled: false,
    rootMargin: '0px 0px 1000px 0px',
  })

  return (
    <>
      {/* <ArrowUp
        onClick={() => scrollTo("#filter")}
        className={`w-12 h-12 fixed bottom-6 right-6 bg-frida-pink rounded-full transform ${
          showScrollup ? "translate-x-0" : "translate-x-32"
        } `}
      /> */}

      {/* <div ref={gridRef}> */}

      <Grid>
        {items.map((artwork, index) => (
          <ArtworkCard key={artwork.slug} artwork={artwork}></ArtworkCard>
        ))}
      </Grid>
      {hasNextPage && <div ref={sentryRef}>Load </div>}

      {/* </div> */}
    </>
  )
}

export default ArtworkContainer
