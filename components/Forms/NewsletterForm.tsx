import React, { useState, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import { m, AnimatePresence } from 'framer-motion'
import cx from 'classnames'
import Image from 'next/image'

import { fadeAnim } from '@lib/animate'
import { useRouter } from 'next/router'

type NewsletterState = {
  email: string
  state: 'init' | 'submitting' | 'success' | 'error'
  verified: boolean
  isSubmitting: boolean
  success: boolean
  errors: { email: boolean }
  hasError: boolean
}

const Newsletter = () => {
  const { locale } = useRouter()

  const id = 'id'
  const yourEmail = locale === 'en' ? 'Your E-Mail' : 'Deine E-Mail'
  const registerNow = locale === 'en' ? 'Register Now!' : 'Jetzt eintragen!'
  const send = locale === 'en' ? 'Send' : 'Senden'

  const [
    { isSubmitting, success, email, errors, hasError, verified, state },
    setState,
  ] = useState<NewsletterState>({
    email: '',
    state: 'init',
    verified: false,
    isSubmitting: false,
    success: false,
    errors: { email: false },
    hasError: false,
  })

  const setEmail = (email: string) => {
    setState((os) => ({ ...os, email, verified: verifyMail(email) }))
  }

  // handle form submission
  // @ts-ignore
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (verifyMail(email)) {
    }

    setState((os) => ({ ...os, email, state: 'submitting' }))

    setTimeout(() => {
      setState((os) => ({ ...os, email, state: 'error' }))
    }, 3000)

    setTimeout(() => {
      setState((os) => ({ ...os, email, state: 'init' }))
    }, 6000)

    // setSubmitting(true)
    // setError(false)
    // fetch('/api/mailchimp/newsletter-join', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     listID: klaviyoListID,
    //     ...data,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setSubmitting(false)
    //     setSuccess(true)
    //   })
    //   .catch((error) => {
    //     setSubmitting(false)
    //     setError(true)
    //     console.log(error)
    //   })
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <AnimatePresence exitBeforeEnter>
        {state === 'init' && (
          <m.div initial="hide" animate="show" exit="hide" variants={fadeAnim}>
            <input
              type="text"
              name="fullName"
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="flex flex-wrap md:flex-nowrap relative">
              <div className={`relative text-xs-fluid w-full`}>
                <label
                  htmlFor={`email-${id}`}
                  className={cx(
                    'absolute  py-3 px-6 text-center md:text-left w-full font-bold text-frida-white',
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
                    'w-full',
                    'form-input px-6 text-xs-fluid md:py-3',
                    'rounded-full',
                    'bg-frida-pink border-0 text-frida-white'
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
                  ' md:absolute right-0 bg-frida-black mt-3 w-full text-frida-white text-xs-fluid rounded-full md:w-48 md:mt-0 py-3 font-bold'
                )}
                disabled={isSubmitting}
              >
                {email && verified ? send : registerNow}
              </button>
            </div>
          </m.div>
        )}

        {state === 'submitting' && (
          <m.div
            key="success"
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeAnim}
          >
            <div className="flex justify-center items-center ">
              <div className="border-frida-pink border-t-3 border-b-3 w-32 rounded-full h-32 animate-spin "></div>
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
              <div className="flex justify-center items-center ">
                <Image
                  width={100}
                  height={100}
                  src="/Icons_Newsletter_success.png"
                  alt="newsletter success"
                />
              </div>
              <p className="p-8 text-center">
                Vielen Dank! Nur noch die E-Mail bestätigen und du bist dabei!
                (bestätigungs Mail kann bis zu 12h dauern)
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
              <div className="flex justify-center items-center ">
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
