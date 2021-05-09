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
export const artworkCard = `

    'imageAssetId':image.asset._ref,
    availability,
    'artistName':artist->anzeigeName,
    'slug': slug.current,
    banner,
    price,
    'artworkName':name,
    'photo': image {
      ${imageMeta}
    }
    
`
