import { useEffect } from 'react'

type listenersKeys = 'ArrowRight' | 'ArrowLeft' | 'all'

type useKeydownList = {
  [key in listenersKeys | string]: () => void
}

const useKeydown = (list: useKeydownList) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (list[e.key]) list[e.key]()
    }
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [list])
}
export default useKeydown
