import React from 'react'

type ConditionalWrapperProps = {
  condition: boolean
  wrapperTrue: (children: React.ReactNode) => JSX.Element
  wrapperFalse: (children: React.ReactNode) => JSX.Element
  children: React.ReactNode
}
const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
  condition,
  wrapperTrue,
  wrapperFalse,
  children,
}) => (condition ? wrapperTrue(children) : wrapperFalse(children))

export default ConditionalWrapper
