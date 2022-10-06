import { NextRouter } from 'next/router'
import { useEffect } from 'react'

const useIsLoading = (router: NextRouter) => {
  useEffect(() => {
    const handleRoutChangeStart = (
      route: string,
      options?: { shallow: boolean }
    ) => {
      if (options?.shallow) return
      document.title = '...loading'
    }
    const handleRoutChangeComplete = (route: string) => {
      console.log(route, 'complete')
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
