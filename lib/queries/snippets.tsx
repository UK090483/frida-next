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
  hotspot: any
  id: string
  type: string
  aspectRatio: number
  lqip: number
}
