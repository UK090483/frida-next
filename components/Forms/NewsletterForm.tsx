import cx from 'classnames'
import { AnimatePresence, m, Variants } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const audienceId = '06987ef843'
const fadeAnim: Variants = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.1,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
}
type NewsletterState = {
  email: string
  fullName: string
  state: 'init' | 'submitting' | 'success' | 'error'
  verified: boolean
  showEmailError: boolean
  isSubmitting: boolean
  success: boolean
  errors: { email: boolean }
  hasError: boolean
  errorMsg?: string
}

const Newsletter = () => {
  const { locale } = useRouter()

  const id = 'id'
  const yourEmail = locale === 'en' ? 'Your E-Mail' : 'Deine E-Mail'
  const registerNow = locale === 'en' ? 'Register Now!' : 'Jetzt eintragen!'
  const send = locale === 'en' ? 'Send' : 'Senden'
  const emailError =
    locale === 'en' ? 'Email is not valid' : 'Email nicht zulässig'

  const [
    { isSubmitting, email, errors, verified, state, fullName, showEmailError },
    setState,
  ] = useState<NewsletterState>({
    email: '',
    showEmailError: false,
    fullName: '',
    state: 'init',
    verified: false,
    isSubmitting: false,
    success: false,
    errors: { email: false },
    hasError: false,
  })

  const setEmail = (email: string) => {
    setState((os) => ({
      ...os,
      email,
      verified: verifyMail(email),
      showEmailError: os.showEmailError ? !verifyMail(email) : false,
    }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!verifyMail(email)) {
      return setState((os) => ({
        ...os,
        showEmailError: true,
      }))
    }

    setState((os) => ({ ...os, state: 'submitting' }))

    fetch('/api/mailchimp/newsletter-join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audienceID: audienceId,
        email,
        fullName,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setState((os) => ({
          ...os,
          email,
          state: res.error ? 'error' : 'success',
          submiting: false,
          error: !!res.error,
          success: !res.error,
        }))
      })
      .catch(() => {
        setState((os) => ({
          ...os,
          email,
          state: 'error',
          submiting: false,
          hasError: true,
          success: false,
        }))
      })
  }

  return (
    <form noValidate={true} onSubmit={(e) => onSubmit(e)}>
      <AnimatePresence initial={false}>
        {state === 'init' && (
          <m.div
            key="init"
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeAnim}
          >
            <input
              type="text"
              name="fullName"
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center ">
              <div className={`relative text-xs-fluid w-full max-w-md`}>
                <label
                  htmlFor={`email-${id}`}
                  className={cx(
                    'absolute inset-0 flex text-frida-white justify-center items-center text-sm-fluid md:text-base-fluid font-bold ',
                    {
                      hidden: !!email,
                    }
                  )}
                >
                  {yourEmail}
                </label>
                <input
                  id={`email-${id}`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  className={cx(
                    'font-bold text-sm-fluid md:text-base-fluid  w-full max-w-md text-center',
                    'form-input',
                    'bg-frida-pink text-frida-white border-transparent rounded-full'
                  )}
                />

                {errors.email && (
                  <span role="alert" className="control--error">
                    {errors.email}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className={cx(
                  'button is-large font-bold w-full text-frida-white  max-w-md mt-6',
                  ` ${showEmailError ? 'bg-frida-red' : 'bg-frida-black'}`
                )}
                disabled={isSubmitting}
              >
                {email && verified
                  ? send
                  : showEmailError
                  ? emailError
                  : registerNow}
              </button>
            </div>
          </m.div>
        )}

        {state === 'submitting' && (
          <m.div
            key="submitting"
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeAnim}
          >
            <div className="flex items-center justify-center ">
              <div className="w-32 h-32 rounded-full border-frida-pink border-t-3 border-b-3 animate-spin "></div>
            </div>
          </m.div>
        )}

        {state === 'success' && (
          <m.div
            key="success"
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeAnim}
            className="form--success"
          >
            <div>
              <div className="flex items-center justify-center ">
                <Image
                  width={100}
                  height={100}
                  src="/Icons_Newsletter_success.png"
                  alt="newsletter success"
                />
              </div>
              <p className="p-8 text-center">
                Vielen Dank! Nur noch die E-Mail bestätigen und du bist dabei!
                (Bestätigungs-E-Mail kann bis zu 12h dauern)
              </p>
            </div>
          </m.div>
        )}

        {state === 'error' && (
          <m.div
            key="error"
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeAnim}
            className="form--error"
          >
            <div>
              <div className="flex items-center justify-center ">
                <Image
                  width={100}
                  height={100}
                  src="/Icons_Newsletter_error.png"
                  alt="newsletter error"
                />
              </div>
              <div className="p-8 text-center">
                <p>Hmmmm..., da stimmt was nicht </p>
                <p>Bist du vielleicht schon im Newsletter ?</p>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </form>
  )
}

export default Newsletter

const verifyMail = (mail: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return re.test(String(mail).toLowerCase())
}
