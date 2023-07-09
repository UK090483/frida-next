import React from 'react'

import Icon from '@components/Icon'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import { useRouter } from 'next/router'

const PaymentInfo: React.FC = () => {
  const { locale } = useRouter()

  const questionsText = locale === 'en' ? 'questions?' : ' Du hast eine Frage?'
  const helpText =
    locale === 'en'
      ? ' We are glad to help you!'
      : ' Wir helfen Dir gerne weiter!'
  const savePaymentText =
    locale === 'en'
      ? 'Secure payment by credit card or PayPal'
      : 'Sichere Zahlung per Kreditkarte oder PayPal'
  const versandText =
    locale === 'en'
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
