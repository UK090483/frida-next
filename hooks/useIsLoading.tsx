import { NextRouter } from 'next/router'
import { useEffect, useRef } from 'react'

const useIsLoading = (router: NextRouter) => {
  const timeOut = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleRoutChangeStart = (
      route: string,
      options?: { shallow: boolean }
    ) => {
      if (options?.shallow) return
      timeOut.current = setTimeout(() => {
        document.title = '...loading'
      }, 500)
    }
    const handleRoutChangeComplete = (route: string) => {
      if (timeOut.current) {
        clearTimeout(timeOut.current)
      }
      timeOut.current = null
    }

    router.events.on('routeChangeStart', handleRoutChangeStart)
    router.events.on('routeChangeComplete', handleRoutChangeComplete)
    router.events.on('routeChangeError', handleRoutChangeComplete)
    return () => {
      router.events.off('routeChangeStart', handleRoutChangeStart)
      router.events.off('routeChangeComplete', handleRoutChangeComplete)
      router.events.off('routeChangeError', handleRoutChangeComplete)
    }
  }, [router])
}

export default useIsLoading
