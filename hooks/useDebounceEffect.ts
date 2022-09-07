import React, { useEffect } from 'react'

function useDebounceEffect(
  cb: () => void,
  delay: number,
  deps: React.DependencyList
) {
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        cb()
      }, delay)
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [...deps, delay] // Only re-call effect if value or delay changes
  )
}

export default useDebounceEffect
