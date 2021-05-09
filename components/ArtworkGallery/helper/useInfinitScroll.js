import { useState, useEffect } from 'react'

export default function useInfenitScroll(
  gridRef,
  artworks,
  scrollRef,
  infinite,
  loadMore
) {
  const [postCount, setPostCount] = useState(9)
  const [showScrollup, setShowScrollup] = useState(false)
  const [loading, setloading] = useState(false)

  useEffect(() => {
    if (infinite) {
      window.addEventListener('scroll', handleScroll)
    }
    function handleScroll() {
      if (gridRef.current) {
        if (!showScrollup && window.scrollY > 1800) {
          setShowScrollup(true)
        } else if (showScrollup && window.scrollY < 1800) {
          setShowScrollup(false)
        }
        const clientRef = gridRef.current.getBoundingClientRect()

        if (clientRef.bottom - window.innerHeight < 1200) {
          if (!loading) {
            setloading(true)
            loadMore(setloading)
          }

          if (postCount < artworks.length) {
            const ADD = 9
            const nextPostcount =
              postCount + ADD > artworks.length
                ? artworks.length
                : postCount + ADD

            setPostCount(nextPostcount)
          }
        }
      }
    }
    return () => {
      if (infinite) {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [
    artworks.length,
    gridRef,
    infinite,
    loadMore,
    loading,
    postCount,
    showScrollup,
  ])

  return { postCount, showScrollup, loading }
}
