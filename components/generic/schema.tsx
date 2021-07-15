import React from 'react'

type SeoRes = {
  metaDesc?: string
  metaTitle?: string
  shareGraphicSrc?: string
  url?: string
}

const generateSchema = (props: any, seoRes: SeoRes) => {
  const data = props.page

  let schema: null | any = null

  if (data?._type === 'page' || data?._type === 'indexPage') {
    schema = [
      {
        '@context': 'http://schema.org',

        '@type': 'Organization',
        name: 'MeetFrida',
        url: seoRes.url,
        brand: 'MeetFrida',

        foundingDate: '2000',

        logo: seoRes.shareGraphicSrc,
        sameAs: [
          'https://www.facebook.com/meetfrida.art',
          'https://www.instagram.com/meetfrida.art/',
        ],
      },
      {
        '@context': 'http://schema.org',
        '@type': data._type === 'page' ? 'WebPage' : 'WebSite',

        url: seoRes.url,
        name: 'MeetFrida',
        publisher: {
          '@context': 'http://schema.org',
          '@type': 'Organization',
          brand: 'MeetFrida',
        },
      },
    ]
  }
  if (data?._type === 'artwork') {
    schema = [
      {
        '@context': 'http://schema.org',
        '@graph': [
          {
            '@type': 'Painting',
            '@id': '#creativeWork',
            name: data.artworkName,
            image: seoRes.shareGraphicSrc,
            creator: {
              '@type': 'Person',
              name: data.artistName,
            },
            url: seoRes.url,
            description: seoRes.metaDesc,
          },
        ],
      },
      {
        '@context': 'https://www.schema.org',
        '@type': 'product',
        name: data.artworkName,
        image: seoRes.shareGraphicSrc,
        description: data.description,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          price: data.price,
          availability: 'http://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'MeetFrida',
          },
        },
      },
    ]
  }
  if (data?._type === 'artist') {
    schema = []
  }

  if (data?._type === 'artist') {
    schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',

        image: seoRes.shareGraphicSrc,
        jobTitle: 'Artist',
        name: data.anzeigeName,

        url: seoRes.url,
        sameAs: [
          ...(data.webLink ? [data.webLink] : []),
          ...(data.instagramLink ? [data.instagramLink] : []),
        ],
      },
    ]
  }

  if (data?._type === 'post') {
    schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: seoRes.metaTitle,

        image: seoRes.shareGraphicSrc,

        genre: 'art',
        keywords: 'art gallery',

        url: seoRes.url,

        description: seoRes.metaDesc,

        author: {
          '@type': 'Organisation',
          name: 'MeetFrida',
        },
      },
    ]
  }

  if (!schema) return null

  return schema.map((s: any, index: number) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
    />
  ))
}

export default generateSchema
