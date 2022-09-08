import React, { useContext } from 'react'
import { LayoutResult } from './layoutQuery'

interface ILayoutContextState {
  data?: LayoutResult | null
  preview: boolean
}

const defaultState: ILayoutContextState = {
  data: null,
  preview: false,
}

const LayoutContext = React.createContext(defaultState)

interface LayoutContextProviderProps {
  data: ILayoutContextState['data']
  children?: React.ReactNode
  preview?: boolean
}

export const LayoutContextProvider = (props: LayoutContextProviderProps) => {
  const { children, ...rest } = props
  return (
    <LayoutContext.Provider value={{ preview: false, ...rest }}>
      {children}
    </LayoutContext.Provider>
  )
}

export const useLayoutContext = () => {
  return useContext(LayoutContext)
}

export const useLayoutData = () => {
  const { data } = useLayoutContext()
  return data
}
