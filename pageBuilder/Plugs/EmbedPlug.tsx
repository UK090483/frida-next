import React from 'react'
import Embed from '@components/Embed'

const EmbedPlug = (props: any) => {
  const { node } = props
  return <Embed url={node.url} />
}

export default EmbedPlug
