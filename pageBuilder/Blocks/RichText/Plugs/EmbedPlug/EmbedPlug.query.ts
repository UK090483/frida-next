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
