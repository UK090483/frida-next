export const imageMeta = `
    alt,
    asset,
    crop,
    customRatio,
    hotspot,
    "id": asset->assetId,
    "type": asset->mimeType,
    "aspectRatio": asset->metadata.dimensions.aspectRatio,
    "lqip": asset->metadata.lqip
`

export type ImageMetaResult = {
  alt: string | null
  asset: any
  customRation: number
  hotspot?: { x: number; y: number } | null
  crop?: { bottom: number; top: number; right: number; left: number } | null
  id: string
  type: string
  aspectRatio: number
  lqip: string
  fill?: 'fill' | 'contain'
}
