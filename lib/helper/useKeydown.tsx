import { useEffect } from 'react'

type listenersKeys = 'ArrowRight' | 'ArrowLeft' | 'all' | string

type useKeydownList = {
  [key in listenersKeys | string]: (e: KeyboardEvent) => void
}

const useKeydown = (list: useKeydownList) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (list[e.key]) list[e.key](e)
    }
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [list])
}
export default useKeydown
