import React from 'react'

import Icon from '@components/lib/Icon'

const PaymentInfo: React.FC = () => {
  return (
    <div className="text-sm-fluid w-full ">
      <p>
        Du hast eine Frage?
        <a href="mailto:name@email.com"> Wir helfen Dir gerne weiter!</a>
      </p>

      <div className="flex  sm:flex-nowrap  justify-between">
        <div className="pr-2">
          <Icon icon="creditCard" color="black" bgColor="grey" />
          <p>Sichere Zahlung per Kreditkarte oder PayPal</p>
        </div>
        <div>
          <Icon icon="email" color="black" bgColor="grey" />
          <p>Versandt erfolgt direkt durch die Künstler</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentInfo
