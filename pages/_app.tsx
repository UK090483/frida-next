// import ShowBreakingPoints from '@lib/helper/showBreakingPoints'
import Cart from '@components/shopComponents/Cart'
import { SiteContextProvider } from '@lib/context/context'
import { isBrowser } from '@lib/helpers'
import { AnimatePresence, domAnimation, LazyMotion } from 'framer-motion'
import Head from 'next/head'
import Router from 'next/router'
import React, { useEffect, useState, useCallback } from 'react'
import 'resize-observer-polyfill'
import '../styles/app.css'
import '../styles/tailwind.css'
// import LogRocket from 'logrocket'
// LogRocket.init('6dxpjn/test')
import type {
  AppProps,
  //  NextWebVitalsMetric
} from 'next/app'

// import Honeybadger from '@honeybadger-io/js'
// import ErrorBoundary from '@honeybadger-io/react'

// Honeybadger.configure({
//   apiKey: 'hbp_p1Jh4oN3FCcNBfxecEQxr7m3CSlWjL2saOIR',
//   environment: 'production',
//   reportData: true,
// })
// Honeybadger.notify('Hello from React')
import ChromeFix from 'lib/chromeFix'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const lang = pageProps.lang === 'en' ? 'en' : 'de'
  const [isLoading, setLoading] = useState(false)

  // The scroll location on the page is not restored on history changes
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [router])

  // Trigger our loading class
  useEffect(() => {
    if (isBrowser) {
      document.documentElement.classList.toggle('is-loading', isLoading)

      // @ts-ignore
      new ChromeFix()
    }
  }, [isLoading])

  // Setup Next router events
  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      // Bail if we're just changing a URL parameter

      if (
        url.indexOf('?') > -1 &&
        url.split('?')[0] === router.asPath.split('?')[0]
      )
        return

      // Otherwise, start loading
      setLoading(true)
    })

    Router.events.on('routeChangeComplete', () => {
      setTimeout(() => setLoading(false), 400) // accounts for page transition
    })

    Router.events.on('routeChangeError', () => {
      setLoading(false)
    })
  }, [router.asPath])

  // intelligently add focus states if keyboard is used

  const handleFirstTab = useCallback((event: KeyboardEvent) => {
    if (event.keyCode === 9) {
      if (isBrowser) {
        document.body.classList.add('is-tabbing')
        window.removeEventListener('keydown', handleFirstTab)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleFirstTab)
    return () => {
      window.removeEventListener('keydown', handleFirstTab)
    }
  }, [handleFirstTab])

  return (
    // <ErrorBoundary honeybadger={Honeybadger}>
    <SiteContextProvider data={{ ...pageProps?.data?.site }}>
      <LazyMotion features={domAnimation}>
        {isLoading && (
          <Head>
            <title>Loading...</title>
          </Head>
        )}

        <AnimatePresence
          initial={false}
          onExitComplete={() => {
            window.scrollTo(0, 0)
            document.body.classList.remove('overflow-hidden')
          }}
        >
          <Component key={router.asPath.split('?')[0]} {...pageProps} />
        </AnimatePresence>

        <Cart data={{ ...pageProps?.data?.site }} lang={lang} />

        {/* <ShowBreakingPoints /> */}
      </LazyMotion>
    </SiteContextProvider>
    // </ErrorBoundary>
  )
}
// export function reportWebVitals(metric: NextWebVitalsMetric) {
//    console.log(metric)
// }

export default MyApp
