import React from 'react'

import Icon from '@components/Icon'
import { FridaLocation } from 'types'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'

const PaymentInfo: React.FC<{ lang: FridaLocation }> = ({ lang }) => {
  const questionsText = lang === 'en' ? 'questions?' : ' Du hast eine Frage?'
  const helpText =
    lang === 'en'
      ? ' We are glad to help you!'
      : ' Wir helfen Dir gerne weiter!'
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
        <a
          {...mouseLinkProps}
          href="mailto:hello@meetfrida.art"
          className="font-bold underline"
        >
          {helpText}
        </a>
      </p>

      <div className="flex flex-wrap justify-between sm:flex-nowrap">
        <div className="flex items-center pb-2">
          <div>
            <Icon
              withMouseHover={false}
              icon="creditCard"
              color="black"
              bgColor="grey"
            />
          </div>

          <p className="px-4 py-0 text-xs-fluid">{savePaymentText}</p>
        </div>
        <div className="flex items-center pb-2">
          <div>
            <Icon
              withMouseHover={false}
              icon="email"
              color="black"
              bgColor="grey"
            />
          </div>
          <p className="px-4 py-0 text-xs-fluid">{versandText}</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentInfo
