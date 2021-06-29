import { useContext } from 'react'
import { SiteContext } from './context'

function useCheckout() {
  const {
    context: { checkout },
  } = useContext(SiteContext)

  return checkout.webUrl
}

export default useCheckout
