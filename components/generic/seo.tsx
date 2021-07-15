import { SiteResult } from '@lib/queries/cache'
import { imageBuilder } from '@lib/sanity'
import generateSeo from '@lib/useSeo'
import Head from 'next/head'
import React from 'react'
import schema from 'studio/schemas/schema'
import generateSchema from './schema'
import Schema from './schema'

type SEOProps = {
  site: SiteResult
  page: any
}

const SEO: React.FC<SEOProps> = (props) => {
  const { site, page } = props

  const seoRes = generateSeo(site.seo, page, imageBuilder)

  const {
    metaTitle,
    metaDesc,
    shareTitle,
    shareGraphicSrc,
    shareDesc,
    siteTitle,
    url,
  } = seoRes

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="format-detection" content="telephone=no" />

        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="mask-icon" href="/icons/favicon.ico" color="#f5c5d9" />
        <meta name="theme-color" content="#f5c5d9" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

        <link rel="preconnect" href="https://hull-demo.myshopify.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" />

        <link rel="canonical" href={url} />

        <title>{metaTitle}</title>
        {metaDesc && <meta name="description" content={metaDesc} />}
        {shareTitle && (
          <>
            <meta property="og:title" content={shareTitle} />
            <meta name="twitter:title" content={shareTitle} />
          </>
        )}
        {shareDesc && (
          <>
            <meta property="og:description" content={shareDesc} />
            <meta name="twitter:description" content={shareDesc} />
          </>
        )}
        {shareGraphicSrc && (
          <>
            <meta property="og:image" content={shareGraphicSrc} />
            <meta name="twitter:image" content={shareGraphicSrc} />
          </>
        )}
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        {siteTitle && <meta name="og:site_name" content={siteTitle} />}
        {generateSchema(props, seoRes)}
      </Head>
    </>
  )
}

export default SEO
