import React, { useEffect } from 'react'

function useDebounceEffect(
  cb: () => void,
  delay: number,
  deps: React.DependencyList
) {
  useEffect(() => {
    const handler = setTimeout(() => {
      cb()
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [...deps, delay])
}

export default useDebounceEffect
