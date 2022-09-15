import useBodyScrollStop from '../../hooks/useBodyScrollStop'
import { useContext } from 'react'
import { SiteContext } from './context'
import React from 'react'
function useToggleMegaNav() {
  const {
    context: {
      meganav: { isOpen },
    },
    setContext,
  } = useContext(SiteContext)

  const { stopBodyScroll, enableBodyScroll } = useBodyScrollStop()

  React.useEffect(() => {
    if (isOpen) {
      return stopBodyScroll()
    }
    enableBodyScroll()
  }, [isOpen, stopBodyScroll, enableBodyScroll])

  async function toggleMegaNav() {
    setContext((prevState) => {
      return {
        ...prevState,
        meganav: {
          ...prevState.meganav,
          isOpen: !isOpen,
        },
      }
    })
  }
  return toggleMegaNav
}
export { useToggleMegaNav }
