import React from 'react'
import Embed from '@components/Embed'

export const embedPlugQuery = ` 
_type == "embed" => {
   url
}
`

export type EmbedPlugResult = {
  _type: 'embed'
  url?: null | string
}

const EmbedPlug: React.FC<EmbedPlugResult> = ({ url }) => {
  if (!url) return <div>url is missing</div>
  return <Embed url={url} />
}

export default EmbedPlug
