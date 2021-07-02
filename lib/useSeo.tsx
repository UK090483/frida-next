import { ImageUrlBuilder } from 'next-sanity-image'
import { ImageMetaResult } from './queries/snippets'
type DefaultSeo = {
  metaTitle?: null | string
  metaDesc?: null | string
  shareDesc?: null | string
  shareGraphic?: null | ImageMetaResult
  shareTitle?: null | string
  siteTitle?: null | string
}

type SeoResult = {
  metaTitle: string
  metaDesc: string
  shareTitle: string
  shareGraphic: ImageMetaResult
  shareDesc: string
  siteTitle: string
  url: string
  shareGraphicSrc: string
}

type Document = {
  _type: string
  seo?: Partial<SeoResult>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any
}

const generateSeo: (
  defaultSeo: DefaultSeo,
  document: Document,
  imageBuilder: ImageUrlBuilder
) => any = (defaultSeo, document, imageBuilder) => {
  let metaTitle = defaultSeo.metaTitle || ''
  let metaDesc = defaultSeo.metaDesc || ''
  let shareTitle = defaultSeo.shareTitle || ''
  let shareDesc = defaultSeo.shareDesc || ''
  let shareGraphic = defaultSeo.shareGraphic
  const siteTitle = defaultSeo.siteTitle || 'MeetFrida'
  let url = 'https://meetfrida.art/'
  const docSeo = document.seo

  let shareGraphicSrc = shareGraphic && getImageSrc(shareGraphic, imageBuilder)
  const cShareGraphicSrc =
    docSeo?.shareGraphic && getImageSrc(docSeo?.shareGraphic, imageBuilder)

  if (document._type === 'artwork') {
    const cDescription = `Kaufen Sie "${document.artworkName}" jetzt auf MeetFrida.art`
    const cShareTitle = `"${document.artworkName}" by "${document.artistName}"`
    const cMetaTitle = `MeetFrida | Artwork: ${document.artworkName}`

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
    const cMetaTitle = `MeetFrida | ${document.title}`
    metaTitle = getDefined([docSeo?.metaTitle, cMetaTitle], metaTitle)
    metaDesc = getDefined([docSeo?.metaDesc], metaDesc)
    shareTitle = getDefined([docSeo?.shareTitle], shareTitle)
    shareDesc = getDefined([docSeo?.shareDesc], shareDesc)
    shareGraphic = getDefined([docSeo?.shareGraphic], shareGraphic)
    shareGraphicSrc = getDefined([cShareGraphicSrc], shareGraphicSrc)
    url = `${url}${document.slug?.current || ''}`
  }
  if (document._type === 'artist') {
    const cDescription = `Jetzt Artworks von ${document.anzeigeName} auf MeetFrida entdecken`
    const cShareTitle = `Jetzt Artworks von ${document.anzeigeName} auf MeetFrida entdecken`
    const cMetaTitle = `MeetFrida | ${document.anzeigeName}`

    const cShareGraphic = getDefined(
      [
        document.mainImage,
        document.prevImage,
        document.relatedArtworks &&
          document.relatedArtworks[0] &&
          document.relatedArtworks[0].photo,
      ],
      null
    )

    metaTitle = getDefined([docSeo?.metaTitle, cMetaTitle], metaTitle)
    metaDesc = getDefined([docSeo?.metaDesc], cDescription)
    shareTitle = getDefined([docSeo?.shareTitle], cShareTitle)
    shareDesc = getDefined([docSeo?.shareDesc], cDescription)

    shareGraphic = getDefined(
      [docSeo?.shareGraphic, cShareGraphic],
      shareGraphic
    )

    shareGraphicSrc = getDefined(
      [getFittedImageSrc(cShareGraphic, imageBuilder), cShareGraphicSrc],
      shareGraphicSrc
    )
    url = `${url}artist/${document.slug || ''}`
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

const getFittedImageSrc = (
  image: ImageMetaResult | null | undefined,
  IB: ImageUrlBuilder
) => {
  return (
    IB &&
    image &&
    image.asset &&
    IB.image(image.asset)
      .width(1200)
      .height(630)
      .fit('fill')
      .format('png')
      .ignoreImageParams()
      .bg('f5c5d9')
      .pad(20)
      .url()
  )
}

const getImageSrc = (image: ImageMetaResult, IB: ImageUrlBuilder) => {
  return (
    IB &&
    image &&
    image.asset &&
    IB.image(image.asset).width(1200).height(630).url()
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDefined = (args: any[], alt: any) => {
  return args.filter((i) => i)[0] || alt
}
