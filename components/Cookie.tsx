import React, { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import Cookies from 'js-cookie'

import { useHasMounted } from '@lib/helpers'

import { useRouter } from 'next/router'
import Button from 'components/buttons/button'
import Icon from './Icon'

const barAnim = {
  show: {
    y: '0%',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hide: {
    y: '100%',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const CookieBar: React.FC = () => {
  const { locale } = useRouter()
  const message =
    'Wir nutzen Cookies um Ihr Erlebnis auf unserer Website angenehm zu gestalten und steig zu verbessen!'
  const message_en =
    'We use cookies to make your experience on our website pleasant and to improve it!'

  const [declined, setDeclined] = useState(false)

  const hasMounted = useHasMounted()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()

  if (!hasMounted || !message) return null

  return (
    <AnimatePresence>
      {!acceptedCookies && !declined && (
        <m.div
          initial="hide"
          animate="show"
          exit="hide"
          variants={barAnim}
          role="dialog"
          aria-live="polite"
          className="fixed left-0 right-0 bottom-0 bg-frida-white z-90 p-2 md:p-4 w-full "
        >
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center">
            <div className="flex  justify-between items-center  text-xs-fluid md:pr-frida_7%">
              <img src="/Cookie.png" alt="cookie" className="h-20" />

              <p className=" text-xs-fluid">
                {locale === 'en' ? message_en : message}
              </p>
            </div>

            <div className={'flex justify-between items-center w-full md:w-60'}>
              <Button
                onClick={() => onAcceptCookies()}
                label={locale === 'en' ? 'Accept' : 'Einverstanden'}
                type="click"
                size="s"
              >
                Accept
              </Button>

              <Icon
                onClick={() => setDeclined(true)}
                icon="x"
                size="s"
                color="pink"
                className="border-3 border-frida-pink"
              />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

function useAcceptCookies(cookieName = 'accept_cookies') {
  const [acceptedCookies, setAcceptedCookies] = useState(true)

  useEffect(() => {
    if (!Cookies.get(cookieName)) {
      setAcceptedCookies(false)
    }
  }, [])

  const acceptCookies = () => {
    setAcceptedCookies(true)
    Cookies.set(cookieName, 'accepted', { expires: 365 })
  }

  return {
    acceptedCookies,
    onAcceptCookies: acceptCookies,
  }
}

export default React.memo(CookieBar)
