import { FridaColors } from 'types'

export const buttonPlugQuery = ` 
_type == "button" => {
  _type,
  _key,
    label,
    bgColor,
    color,
    inline,
    link,
    'internalLink' :internalLink->{"type":_type,'slug':slug.current}
}
`

export type ButtonPlugResult = {
  _key: string
  _type: 'button'
  label: string | null
  label_en: string | null
  internalLink: { slug: string; type: string } | null
  link: string | null
  color: FridaColors | null
  bgColor: FridaColors | null
  position?: 'inline' | 'left' | 'right' | 'center'
}
