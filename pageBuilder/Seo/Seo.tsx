import * as React from 'react'
import { useSeoContext } from './seoContext'
import Head from 'next/head'
import isDevelopment from 'utility/isDevelopment'
import { imageBuilder } from 'lib/Sanity/sanity'

import { shareImageResult } from './seoQuery'
import { useRouter } from 'next/router'

type ImageUrlBuilder = typeof imageBuilder
const baseUrl = isDevelopment
  ? 'http://localhost:3000/'
  : 'https://www.meetfrida.art/'

const titlePrefix = 'MeetFrida | '

export function Seo() {
  const { locale } = useRouter()
  const { data } = useSeoContext()

  const metaTitle = titlePrefix + data?.metaTitle
  const metaDesc = data?.metaDesc
  const shareTitle = data?.shareTitle
  const shareDesc = data?.shareDesc
  const shareGraphicSrc = getImage(data?.shareGraphic, imageBuilder)
  const hasNoUrl = data?.url === null
  const fullSlug = hasNoUrl ? '' : data?.url
  const _locale = locale === 'en' ? (hasNoUrl ? 'en' : 'en/') : ''
  const canonical = baseUrl + _locale + fullSlug

  return (
    <Head>
      <title>{metaTitle}</title>
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={shareTitle} />
      <meta name="twitter:title" content={shareTitle} />
      <meta name="description" content={metaDesc} />
      <meta property="og:description" content={shareDesc} />
      <meta name="twitter:description" content={shareDesc} />
      {shareGraphicSrc && (
        <meta property="og:image" content={shareGraphicSrc} />
      )}
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

const getFittedImageSrc = (
  image: shareImageResult | null | undefined,
  IB: ImageUrlBuilder
) => {
  return (
    IB &&
    image &&
    IB.image(image)
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

const getImageSrc = (
  image: shareImageResult | null | undefined,
  IB: ImageUrlBuilder
) => {
  return IB && image && IB.image(image).width(1200).height(630).url()
}

const getImage = (
  image: shareImageResult | null | undefined,
  IB: ImageUrlBuilder
) => {
  if (!image || !image.aspectRatio) {
    return null
  }
  const isRightAspect = image?.aspectRatio
    ? Math.abs(1.9047619047619047 - image?.aspectRatio) < 0.01
    : false

  if (isRightAspect) {
    return getImageSrc(image, IB)
  }
  return getFittedImageSrc(image, IB)
}
