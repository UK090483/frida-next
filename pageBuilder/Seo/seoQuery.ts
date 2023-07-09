const seoSettingsQuery = `*[_type == "seoSettings"][0]`

type changer = {
  derived?: string
}
type buildSeoQueryProps = {
  metaTitle?: changer
  metaDesc?: changer
  shareTitle?: changer
  shareDesc?: changer
  shareGraphic?: changer
  url?: changer
}

const defaultChanger = {
  derived: '',
}
const defaultProps = {
  metaTitle: defaultChanger,
  metaDesc: defaultChanger,
  shareTitle: defaultChanger,
  shareDesc: defaultChanger,
  shareGraphic: defaultChanger,
  url: defaultChanger,
}

const shareImageQuery = `...(asset->{...,'aspectRatio':metadata.dimensions.aspectRatio})`

export type shareImageResult = {
  aspectRatio: number
  _ref: string
}

export const buildSeoQuery = (props?: buildSeoQueryProps) => {
  const _props = { ...defaultProps, ...props }

  const build = Object.entries(_props)
    .map(([name, changer]) => {
      if (name === 'shareGraphic') {
        return `"${name}": coalesce(seo.shareGraphic, ${changer.derived} ${seoSettingsQuery}.shareGraphic){${shareImageQuery}},`
      }
      if (name === 'url') {
        return `"${name}": ${changer.derived || 'slug.current'},`
      }
      return `"${name}": coalesce(seo.${name}, ${changer.derived} ${seoSettingsQuery}.${name} ),`
    })
    .join('')

  return `
'seo':{
  ${build}
}
`
}

export type seoResult = {
  metaTitle: string
  metaDesc: string
  shareTitle: string
  shareDesc: string
  shareGraphic: shareImageResult
  url: string
  shareGraphicSrc: string
}
