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
    <div className="text-sm-fluid w-full ">
      <p>
        {questionsText}
        <a href="mailto:name@email.com"> {helpText}</a>
      </p>

      <div className="flex  sm:flex-nowrap  justify-between">
        <div className="pr-2">
          <Icon icon="creditCard" color="black" bgColor="grey" />
          <p>{savePaymentText}</p>
        </div>
        <div>
          <Icon icon="email" color="black" bgColor="grey" />
          <p>{versandText}</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentInfo
