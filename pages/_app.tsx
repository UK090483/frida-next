import React, { useEffect, useCallback, useRef } from 'react'
import Cart from '@components/shopComponents/Cart'
import { SiteContextProvider } from 'contexts/shopContext/context'
import { AnimatePresence, domAnimation, LazyMotion } from 'framer-motion'
import Head from 'next/head'

import 'resize-observer-polyfill'
import '../styles/app.css'
import '../styles/tailwind.css'

import type { AppProps } from 'next/app'

import ChromeFix from 'lib/chromeFix'
import { LayoutContextProvider } from 'pageBuilder/Layout/LayoutContext'
import { SeoContextProvider } from 'pageBuilder/Seo/seoContext'
import usePageTransition from 'hooks/usePageTransition'
import PageTransition from 'lib/pageTransition/PageTransitionSwitch'
import useIsTabbing from 'hooks/useIsTabbing'
import useIsLoading from 'hooks/useIsLoading'
import { useRouter } from 'next/router'
import Header from '@components/generic/Header'

const MyApp = ({ Component, pageProps, router }: AppProps<any>) => {
  const { restoreScroll } = usePageTransition()
  useIsTabbing()
  const isLoading = useIsLoading(router)

  console.log(router)

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="format-detection" content="telephone=no" />

        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="mask-icon" href="/icons/favicon.ico" color="#f5c5d9" />
        <meta name="theme-color" content="#f5c5d9" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

        <link rel="preconnect" href="https://hull-demo.myshopify.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </Head>

      <SeoContextProvider data={pageProps?.data?.seo}>
        <LayoutContextProvider data={pageProps?.data?.layout}>
          <SiteContextProvider data={{ ...pageProps?.data?.site }}>
            <LazyMotion features={domAnimation}>
              <LazyMotion features={domAnimation}>
                {isLoading && (
                  <Head>
                    <title>Loading...</title>
                  </Head>
                )}

                <AnimatePresence initial={false} onExitComplete={restoreScroll}>
                  <Component key={router.asPath.split('?')[0]} {...pageProps} />
                </AnimatePresence>
              </LazyMotion>

              <Cart />
            </LazyMotion>
          </SiteContextProvider>
        </LayoutContextProvider>
      </SeoContextProvider>
    </>
  )
}

export default MyApp
