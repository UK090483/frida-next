type DefaultSeo = {
  metaTitle: string
  metaDesc: string
  shareDesc: string
  shareGraphic: any
  shareTitle: string
  siteTitle: string
}

type Document = {
  _type: string
  [k: string]: any
}

const generateSeo = (defaultSeo: DefaultSeo, document: Document) => {
  let metaTitle = defaultSeo.metaTitle
  let metaDesc = defaultSeo.metaDesc
  let shareTitle = defaultSeo.shareTitle
  let shareDesc = defaultSeo.shareDesc
  let shareGraphic = defaultSeo.shareGraphic
  let siteTitle = defaultSeo.siteTitle
  let url = 'https://meetfrida.art/'

  if (document._type === 'artwork') {
    // MetaTitle
    const _metaTitle = document.seo?.metaTitle || document.name
    if (_metaTitle) metaTitle = _metaTitle
    // MetaDesc
    const _metaDesc =
      document.seo?.metaDesc ||
      `Kaufen Sie "${document.name}" jetz auf #MeetFrida.art`
    if (_metaDesc) metaDesc = _metaDesc

    // ShareTitle
    const _shareTitle =
      document.seo?.shareTitle ||
      `"${document.name}" by "${document.artistName}"`
    if (_shareTitle) shareTitle = _shareTitle
    // ShareDesc
    const _shareDesc =
      document.seo?.shareDesc ||
      `Kaufen Sie "${document.name}" jetz auf #MeetFrida.art`
    if (_shareDesc) shareDesc = _shareDesc
    // Url
    url = `${url}artwork/${document.slug?.current || ''}`
  }

  if (document._type === 'page') {
    // MetaTitle
    const _metaTitle = document.seo?.metaTitle
    if (_metaTitle) metaTitle = _metaTitle
    // MetaDesc
    const _metaDesc = document.seo?.metaDesc
    if (_metaDesc) metaDesc = _metaDesc
    // ShareTitle
    const _shareTitle = document.seo?.shareTitle
    if (_shareTitle) shareTitle = _shareTitle
    // ShareDesc
    const _shareDesc = document.seo?.shareDesc
    if (_shareDesc) shareDesc = _shareDesc
    // Url
    url = `${url}${document.slug?.current || ''}`
  }

  return {
    metaTitle,
    metaDesc,
    shareTitle,
    shareGraphic,
    shareDesc,
    siteTitle,
    url,
  }
}

export default generateSeo
