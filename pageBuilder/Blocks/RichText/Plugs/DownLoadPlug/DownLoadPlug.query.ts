import { FridaColors } from 'types'

export const downloadPlugQuery = ` 
_type == "download" => {

  _type,
  _key,
    label,
    bgColor,
    color,
    'imageSrc':image.asset->url,
    'fileSrc':file.asset->url,
    'test':'blaa'
}
`

export type DownloadPlugResult = {
  _key: string
  _type: 'download'
  label: string | null
  imageSrc: string | null
  fileSrc: string | null
  color: FridaColors | null
  bgColor: FridaColors | null
  position?: 'inline' | 'left' | 'right' | 'center'
}
