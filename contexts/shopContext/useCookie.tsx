//@ts-nocheck
import { useContext, useEffect } from 'react'
import { SiteContext } from './context'
import Cookies from 'js-cookie'
import { cookieName } from './helper'
import ReactGA from 'react-ga'
import { useRouter } from 'next/router'

function useCookie() {
  const {
    setContext,
    context: {
      cookie: { accepted, declined },
    },
  } = useContext(SiteContext)

  const router = useRouter()

  useEffect(() => {
    // if (process.env.NODE_ENV === 'development') return
    if (accepted) {
      ReactGA.initialize('UA-55149650-1')
      ReactGA.pageview(location.pathname)
      router.events.on('routeChangeStart', () => {
        ReactGA.pageview(location.pathname)
      })
    }
  }, [accepted, router.events])

  const acceptCookies = () => {
    setContext((prev) => ({
      ...prev,
      cookie: { declined: false, accepted: true },
    }))
    Cookies.set(cookieName, 'accepted', { expires: 365 })
  }
  const declineCookies = () => {
    setContext((prev) => ({
      ...prev,
      cookie: { declined: true, accepted: false },
    }))
  }

  return { accepted, declined, acceptCookies, declineCookies }
}

export default useCookie
