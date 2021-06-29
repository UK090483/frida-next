import { useContext, useState, useEffect } from 'react'
import { SiteContext } from './context'
import Cookies from 'js-cookie'
import { cookieName } from './helper'
import ReactGA from 'react-ga'
import { useRouter } from 'next/router'
// Access our cart item count

function useCookie() {
  const {
    setContext,
    context: {
      cookie: { accepted, declined },
    },
  } = useContext(SiteContext)

  const [isDeclined, setIsDeclined] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (accepted) {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || '', {
        debug: true,
      })
      router.events.on('routeChangeStart', (url) => {
        ReactGA.set({ page: url })
        ReactGA.pageview(location.pathname)
      })
    }
  }, [accepted])

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
