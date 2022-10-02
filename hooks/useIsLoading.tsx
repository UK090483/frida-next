import { NextRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useIsLoading = (router: NextRouter) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleRoutChangeStart = (route: string) => {
      console.log(route, 'start')
      setIsLoading(true)
    }
    const handleRoutChangeComplete = (route: string) => {
      console.log(route, 'complete')
      setIsLoading(false)
    }

    router.events.on('routeChangeStart', handleRoutChangeStart)
    router.events.on('routeChangeComplete', handleRoutChangeComplete)
    router.events.on('routeChangeError', handleRoutChangeComplete)
    return () => {
      router.events.off('routeChangeStart', handleRoutChangeStart)
      router.events.off('routeChangeComplete', handleRoutChangeComplete)
      router.events.off('routeChangeError', handleRoutChangeComplete)
    }
  }, [])

  return isLoading
}

export default useIsLoading
