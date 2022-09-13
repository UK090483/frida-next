import React, { useContext } from 'react'
import { seoResult } from './seoQuery'

interface ISeoContextState {
  data?: seoResult | null
}

const defaultState: ISeoContextState = {
  data: null,
}

const SeoContext = React.createContext(defaultState)

interface SeoContextProviderProps {
  data: ISeoContextState['data']
  children?: React.ReactNode
}

export const SeoContextProvider = (props: SeoContextProviderProps) => {
  const { children, ...rest } = props
  return (
    <SeoContext.Provider value={{ ...rest }}>{children}</SeoContext.Provider>
  )
}

export const useSeoContext = () => {
  return useContext(SeoContext)
}

export const useSeoData = () => {
  const { data } = useSeoContext()
  return data
}
