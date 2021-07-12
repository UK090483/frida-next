import React from 'react'

import Icon from '@components/Icon'
import { FridaLocation } from 'types'

const PaymentInfo: React.FC<{ lang: FridaLocation }> = ({ lang }) => {
  const questionsText = lang === 'en' ? 'questions?' : ' Du hast eine Frage?'
  const helpText =
    lang === 'en' ? 'We are glad to help you!' : 'Wir helfen Dir gerne weiter!'
  const savePaymentText =
    lang === 'en'
      ? 'Secure payment by credit card or PayPal'
      : 'Sichere Zahlung per Kreditkarte oder PayPal'
  const versandText =
    lang === 'en'
      ? 'Sent directly by the artist'
      : 'Versandt erfolgt direkt durch die Künstler'

  return (
    <div className="w-full">
      <p className="text-sm-fluid">
        {questionsText}
        <a href="mailto:name@email.com" className="underline font-bold">
          {helpText}
        </a>
      </p>

      <div className="flex flex-wrap sm:flex-nowrap  justify-between">
        <div className="flex items-start">
          <div>
            <Icon icon="creditCard" color="black" bgColor="grey" />
          </div>

          <p className="text-sm-fluid px-4">{savePaymentText}</p>
        </div>
        <div className="flex items-start justify-start ">
          <div>
            <Icon icon="email" color="black" bgColor="grey" />
          </div>
          <p className="text-sm-fluid px-4">{versandText}</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentInfo
