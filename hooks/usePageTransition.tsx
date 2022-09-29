import router, { Router } from 'next/router'
import { useEffect, useState } from 'react'
import isBrowser from 'utility/isBrowser'

const usePageTransition = () => {
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [router])

  // Trigger our loading class
  useEffect(() => {
    if (isBrowser) {
      // document.documentElement.classList.toggle('is-loading', isLoading)

      // @ts-ignore
      new ChromeFix()
    }
  })

  // Setup Next router events
  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      // Bail if we're just changing a URL parameter
      // if (
      //   url.indexOf('?') > -1 &&
      //   url.split('?')[0] === router.asPath.split('?')[0]
      // )
      //   return
      // // Otherwise, start loading
      // setLoading(true)
    })

    Router.events.on('routeChangeComplete', () => {
      //setTimeout(() => setLoading(false), 400) // accounts for page transition
    })

    Router.events.on('routeChangeError', () => {
      // setLoading(false)
    })
  }, [router.asPath])
}

export default usePageTransition
