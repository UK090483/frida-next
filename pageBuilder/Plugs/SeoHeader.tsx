import React from 'react'
import classNames from 'classnames'
import { FridaColors } from 'types'

export const seoHeaderPlugQuery = ` 
_type == "seoHeader" => {
  _type,
  _key,
  headerType,
  headerStyle,
  headerColor,
}
`
export type SeoHeaderPlugResult = {
  _type: 'seoHeader'
  _key: string
  text?: string
  headerType?: 'H1' | 'H2' | 'H3'
  headerStyle?: string
  headerColor?: FridaColors
}

const SeoHeaderPlug: React.FC<SeoHeaderPlugResult> = (props) => {
  const { text, headerType, headerColor, headerStyle } = props

  const styledText = () => {
    return (
      <span
        className={classNames(
          { 'header-big': headerStyle === 'Header-big' },
          { 'header-medium': headerStyle === 'Header-medium' },
          { 'header-small': headerStyle === 'Header-small' },
          ` text-frida-${headerColor}`
        )}
      >
        {text}
      </span>
    )
  }

  switch (headerType) {
    case 'H1':
      return <h1>{styledText()}</h1>
    case 'H2':
      return <h2>{styledText()}</h2>
    case 'H3':
      return <h3>{styledText()}</h3>
    default:
      return <h1>{styledText()}</h1>
  }
}

export default SeoHeaderPlug
