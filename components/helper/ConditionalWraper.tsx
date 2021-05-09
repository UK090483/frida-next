import React from "react"

type ConditionalWrapperProps = {
  condition: boolean
  wrapperTrue: (children: React.ReactElement) => JSX.Element
  wrapperFalse: (children: React.ReactElement) => JSX.Element
  children: React.ReactElement
}
const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
  condition,
  wrapperTrue,
  wrapperFalse,
  children,
}) => (condition ? wrapperTrue(children) : wrapperFalse(children))

export default ConditionalWrapper
