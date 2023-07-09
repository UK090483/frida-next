import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef } from 'react'

const usePageTransition = () => {
  const router = useRouter()
  const scrollPositions = useRef<{ [url: string]: number }>({})
  const isBack = useRef(false)
  const url = useRef<string | null>(null)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [router])

  // Setup Next router events
  useEffect(() => {
    router.beforePopState(() => {
      isBack.current = true
      return true
    })

    const onRouteChangeStart = () => {
      console.log('saving current route', router.asPath, window.scrollY)

      scrollPositions.current[router.asPath] = window.scrollY
    }

    const onRouteChangeComplete = (_url: any) => {
      url.current = _url
    }

    router.events.on('routeChangeStart', onRouteChangeStart)
    router.events.on('routeChangeComplete', onRouteChangeComplete)
    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart)
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router])

  const restoreScroll = useCallback(() => {
    const hasScrollPosition =
      !!(url.current && isBack.current) && scrollPositions.current[url.current]

    console.log({
      url: url.current,
      scrollPositions: scrollPositions.current,
      isBack: isBack.current,
      hasScrollPosition,
    })

    window.scroll({
      top: hasScrollPosition || 0,
      behavior: 'auto',
    })

    isBack.current = false
  }, [isBack])

  return { restoreScroll }
}

export default usePageTransition
