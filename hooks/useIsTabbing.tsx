import { useEffect } from 'react'

import isBrowser from 'utility/isBrowser'

const useIsTabbing = () => {
  useEffect(() => {
    const handleFirstTab = (e: KeyboardEvent) => {
      if (isBrowser && e.key === 'Tab') {
        document.body.classList.add('is-tabbing')
      }
    }
    window.addEventListener('keydown', handleFirstTab, { once: true })
    return () => {
      window.removeEventListener('keydown', handleFirstTab)
    }
  }, [])
}

export default useIsTabbing
