import React from 'react'
import Embed from '@components/Embed'

export const embedPlugQuery = ` 
_type == "embed" => {
  _type,
  _key,
   url
}
`

export type EmbedPlugResult = {
  _type: 'embed'
  _key: string
  url?: null | string
}

const EmbedPlug: React.FC<EmbedPlugResult> = ({ url }) => {
  if (!url) return <div>url is missing</div>
  return <Embed url={url} />
}

export default EmbedPlug
