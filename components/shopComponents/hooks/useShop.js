import { useEffect, useState } from "react"
import { singletonHook } from "react-singleton-hook"
const init = { loading: true }

function useShop() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [items, setItems] = useState(null)
  const [itemCount, setItemCount] = useState(0)
  const [clientToken, setClientToken] = useState(null)
  const [loadingToken, setLoadingToken] = useState(false)

  const requestClientToken = () => {
    if (!clientToken && !loadingToken) {
      setLoadingToken(true)
      getToken().then(token => {
        setLoadingToken(false)
        console.log("requestClientToken ausgeführt")
        setClientToken(token)
      })
    }
  }

  const eraseItem = id => {
    const nextItems = [...items].filter(_id => id !== _id)
    setItems(nextItems)
  }
  const isOnCard = id => {
    return items && id ? items.find(_id => id === _id) : false
  }
  const openCard = () => {
    setCheckoutOpen(true)
  }
  const addToCart = () => {}
  const setInCart = id => {
    if (items) {
      setItems([...items, id])
    } else {
      setItems([id])
    }
  }

  useEffect(() => {
    const localStorageItems = localStorage.getItem("shopItems")
    if (localStorageItems && !items) {
      setItems(JSON.parse(localStorageItems))
    } else {
      localStorage.setItem("shopItems", JSON.stringify(items))
    }

    const nextItemCount = items ? items.length : 0
    setItemCount(nextItemCount)
  }, [items])

  return {
    clientToken,
    requestClientToken,
    items,
    setInCart,
    openCard,
    itemCount,
    isOnCard,
    eraseItem,
    addToCart,
    checkoutOpen,
    setCheckoutOpen,
  }
}

export default singletonHook(init, useShop)

const getToken = async () => {
  let token = null
  await fetch("/.netlify/functions/braintreeGetToken", {
    method: "POST",
    body: JSON.stringify({
      items: "bla",
    }),
  })
    .then(async response => {
      const r = await response.json()
      token = r.token
    })
    .catch(err => console.log(err))
  return token
}
