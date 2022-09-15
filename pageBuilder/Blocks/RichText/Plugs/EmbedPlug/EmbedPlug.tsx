import React from 'react'
import Embed from '@components/Embed'
import { EmbedPlugResult } from './EmbedPlug.query'

const EmbedPlug: React.FC<EmbedPlugResult> = ({ url }) => {
  if (!url) return <div>url is missing</div>
  return <Embed url={url} />
}

export default EmbedPlug
