import { ImageUrlBuilder } from 'next-sanity-image'
type DefaultSeo = {
  metaTitle?: null | string
  metaDesc?: null | string
  shareDesc?: null | string
  shareGraphic?: any
  shareTitle?: null | string
  siteTitle?: null | string
}

type Document = {
  _type: string
  [k: string]: any
}

type SeoResult = {
  metaTitle: string
  metaDesc: string
  shareTitle: string
  shareGraphic: { asset: {} }
  shareDesc: string
  siteTitle: string
  url: string
  shareGraphicSrc: string
}

const generateSeo: (
  defaultSeo: DefaultSeo,
  document: Document,
  imageBuilder: ImageUrlBuilder
) => any = (
  defaultSeo: DefaultSeo,
  document: Document,
  imageBuilder: ImageUrlBuilder
) => {
  let metaTitle = defaultSeo.metaTitle
  let metaDesc = defaultSeo.metaDesc
  let shareTitle = defaultSeo.shareTitle
  let shareDesc = defaultSeo.shareDesc
  let shareGraphic = defaultSeo.shareGraphic
  let siteTitle = defaultSeo.siteTitle
  let url = 'https://meetfrida.art/'
  const docSeo = document.seo

  let shareGraphicSrc = getImageSrc(shareGraphic, imageBuilder)
  const cShareGraphicSrc = getImageSrc(docSeo?.shareGraphic, imageBuilder)

  if (document._type === 'artwork') {
    const cDescription = `Kaufen Sie "${document.artworkName}" jetzt auf #MeetFrida.art`
    const cShareTitle = `"${document.artworkName}" by "${document.artistName}"`
    const cMetaTitle = `#MeetFrida | Artwork: ${document.artworkName}`

    metaTitle = getDefined([docSeo?.metaTitle, cMetaTitle], metaTitle)
    metaDesc = getDefined([docSeo?.metaDesc, cDescription], metaDesc)
    shareTitle = getDefined([docSeo?.shareTitle, cShareTitle], shareTitle)
    shareDesc = getDefined([docSeo?.shareDesc, cDescription], shareDesc)
    shareGraphic = getDefined(
      [document.photo, docSeo?.shareGraphic],
      shareGraphic
    )
    shareGraphicSrc = getDefined(
      [cShareGraphicSrc, getFittedImageSrc(document.photo, imageBuilder)],
      shareGraphicSrc
    )
    url = `${url}artwork/${document.slug || ''}`
  }

  if (document._type === 'page') {
    const cMetaTitle = `#MeetFrida | ${document.title}`
    metaTitle = getDefined([docSeo?.metaTitle, cMetaTitle], metaTitle)
    metaDesc = getDefined([docSeo?.metaDesc], metaDesc)
    shareTitle = getDefined([docSeo?.shareTitle], shareTitle)
    shareDesc = getDefined([docSeo?.shareDesc], shareDesc)
    shareGraphic = getDefined([docSeo?.shareGraphic], shareGraphic)
    shareGraphicSrc = getDefined([cShareGraphicSrc], shareGraphicSrc)
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
    shareGraphicSrc,
  }
}

export default generateSeo

const getFittedImageSrc = (image: any, IB: ImageUrlBuilder) => {
  return (
    IB &&
    image &&
    image.asset &&
    IB.image(image.asset)
      .width(1200)
      .height(630)
      .fit('fill')
      .ignoreImageParams()
      .bg('f5c5d9')
      .pad(20)
      .url()
  )
}

const getImageSrc = (image: any, IB: ImageUrlBuilder) => {
  return (
    IB &&
    image &&
    image.asset &&
    IB.image(image.asset).width(1200).height(630).url()
  )
}

const getDefined = (args: any[], alt: any) => {
  return args.filter((i) => i)[0] || alt
}
