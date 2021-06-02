import { useRouter } from 'next/router'
import React, { createContext } from 'react'
const { CONFIG_BUILD_ID } = process.env
import useSWR from 'swr'
//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json())

export type ModalPageData = {
  data: null | any
  type: null | 'artwork' | 'artist' | 'post' | 'product'
  dir?: 'in' | 'out' | null
  state: 0 | 1 | 2
  slug: null | string
}
interface ModalContext {
  saveScroll: (path: string) => void
  pushAsModal: (
    slug: string,
    type: 'artwork' | 'artist' | 'post' | 'product'
  ) => void
  closeModal: () => void
  open: boolean
  secondPageData: ModalPageData
  firstPageData: ModalPageData
}

const initialContext: ModalContext = {
  saveScroll: (path) => {},
  open: false,
  pushAsModal: (slug) => {},
  closeModal: () => {},
  firstPageData: { data: null, type: null, slug: null, state: 0 },
  secondPageData: { data: null, type: null, slug: null, state: 0 },
}

const ModalContext = createContext<ModalContext>(initialContext)

interface ModalContextState
  extends Pick<ModalContext, 'open' | 'secondPageData' | 'firstPageData'> {
  closeToSlug: null | string
  state: 0 | 1 | 2 | 3
  savedScroll: null | number
  savedPath: null | string
}
const initialContextState: ModalContextState = {
  firstPageData: initialContext.firstPageData,
  secondPageData: initialContext.secondPageData,
  open: initialContext.open,
  closeToSlug: null,
  state: 0,
  savedScroll: null,
  savedPath: null,
}

const ModalContextProvider: React.FC = ({ children }) => {
  const router = useRouter()

  const [
    {
      open,
      closeToSlug,
      firstPageData,
      secondPageData,
      state,
      savedScroll,
      savedPath,
    },
    setState,
  ] = React.useState<ModalContextState>(initialContextState)

  const { data: firstData } = useSWR(
    !!open && firstPageData.slug
      ? `/_next/data/${CONFIG_BUILD_ID}/${router.locale}${firstPageData.slug}.json`
      : null,
    fetcher
  )

  React.useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      firstPageData: {
        ...oldState.firstPageData,
        data: firstData?.pageProps.data,
      },
    }))
  }, [firstData])

  const { data: secondData } = useSWR(
    !!open && secondPageData.slug
      ? `/_next/data/${CONFIG_BUILD_ID}/de${secondPageData.slug}.json`
      : null,
    fetcher
  )

  React.useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      secondPageData: {
        ...oldState.secondPageData,
        data: secondData?.pageProps.data,
      },
    }))
  }, [secondData])

  React.useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (savedScroll && savedPath === url) {
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  const secondPageIn = (slug: string, type: any) => {
    setState((oldState) => ({
      ...oldState,
      open: true,
      closeToSlug: open ? closeToSlug : router.asPath,
      firstPageData: { ...oldState.firstPageData, dir: 'out' },
      secondPageData: {
        ...oldState.secondPageData,
        slug,
        type,
        dir: 'in',
        state: 1,
      },
      state: 2,
    }))
    setTimeout(() => {
      setState((oldState) => ({
        ...oldState,
        firstPageData: { data: null, slug: null, type: null, state: 0 },
        secondPageData: { ...oldState.secondPageData, dir: null },
      }))
    }, 500)
  }

  const firstPageIn = (slug: string, type: any) => {
    setState((oldState) => ({
      ...oldState,
      open: true,
      closeToSlug: open ? closeToSlug : router.asPath,
      firstPageData: {
        ...oldState.firstPageData,
        slug,
        type,
        dir: 'in',
        state: 1,
      },
      secondPageData: { ...oldState.secondPageData, dir: 'out' },
      state: 1,
    }))
    setTimeout(() => {
      setState((oldState) => ({
        ...oldState,
        firstPageData: { ...oldState.firstPageData, dir: null },
        secondPageData: { data: null, slug: null, type: null, state: 0 },
      }))
    }, 500)
  }

  const pushAsModal: ModalContext['pushAsModal'] = async (slug, type) => {
    console.log('push as modal')
    if (state === 0 || state === 2) {
      firstPageIn(slug, type)
    }
    if (state === 1) {
      secondPageIn(slug, type)
    }

    if (firstPageData.slug && secondPageData.slug) {
      setState((oldState) => ({
        ...oldState,
        slug,
        open: true,
        firstPageData: { ...oldState.firstPageData, slug, type, dir: 'in' },
        secondPageData: { ...oldState.secondPageData, slug, type, dir: 'out' },
        type,
      }))
    }

    setTimeout(() => {
      router.push(open && closeToSlug ? closeToSlug : router.asPath, slug, {
        shallow: true,
      })
    }, 300)

    //@ts-ignore

    // router.push(slug, slug, { scroll: false })
  }

  const saveScroll = (path: string) => {
    setState((oS) => ({ ...oS, savedScroll: window.scrollY, savedPath: path }))
    //@ts-ignore
    window.savedScroll = window.scrollY
    //@ts-ignore
    window.savedPath = path
  }

  const closeModal = () => {
    closeToSlug && router.push(closeToSlug, closeToSlug, { shallow: true })

    setState((oldState) => ({
      ...oldState,
      firstPageData: { ...oldState.firstPageData, dir: 'out' },
      state: 0,
    }))

    setTimeout(() => {
      setState(initialContextState)
    }, 500)
  }

  return (
    <ModalContext.Provider
      value={{
        open,
        pushAsModal,
        closeModal,
        firstPageData,
        secondPageData,
        saveScroll,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

const useModalContext = () => {
  const context = React.useContext(ModalContext)
  return context
}

export { ModalContextProvider, useModalContext }

export default ModalContext
