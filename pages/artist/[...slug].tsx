import Layout from '@components/generic/Layout'
import { usePage } from '@lib/queries/usePage'
import { getAllDocPathsCached } from '@lib/queries/fetchDocPathApi'
import { handleStaticProps } from '@lib/queries/handleStaticProps'
import Error from '@pages/404'
import ArtistSingle from 'PageTypes/Artist/ArtistSingle'
import {
  artworkCardQuery,
  ArtworkCardResult,
} from 'PageTypes/Artwork/ArtworkCard'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { FridaColors, FridaLocation } from 'types'
import { SiteResult } from '@lib/queries/cache'
import { body, PageBodyResult } from 'pageBuilder/pageBuilderQueries'
import { imageMeta, ImageMetaResult } from '@lib/queries/snippets'

export const artistSingleView = `
...,
${body}
initBgColor,
'prevImage':prevImage{${imageMeta}},
'mainImage':mainImage{${imageMeta}},
'imageGallery':imageGallery[]{${imageMeta}},
'slug':slug.current,
'name':anzeigeName,
description,
description_en,
webLink,
instagramLink,
'relatedArtworks':*[_type == 'artwork' && references(^._id)]{
    ${artworkCardQuery}
},
'site':'getSite'
`

export type ArtistPageResult = {
  initBgColor: FridaColors
  slug: string
  name: string | null
  prevImage: ImageMetaResult | null
  mainImage: ImageMetaResult | null
  imageGallery: null | ImageMetaResult[]
  description: string | null
  description_en: string | null
  webLink: string | null
  instagramLink: string | null
  relatedArtworks: ArtworkCardResult[]
  content?: PageBodyResult
  site: SiteResult
}

type ArtworkTemplateProps = {
  data: ArtistPageResult
  lang: FridaLocation
  slug: string
  preview: boolean
}

const query = `
        *[_type == "artist" && slug.current == $slug][0]{
          ${artistSingleView},
        }
      `

const ArtworkTemplate: React.FC<ArtworkTemplateProps> = (props) => {
  const { data, lang, slug, preview } = props
  const { pageData, isError } = usePage({ slug, query, data, preview })

  if (isError) {
    return <Error />
  }
  return (
    <>
      <Layout
        initialColor={data?.initBgColor ? data.initBgColor : 'white'}
        preview={preview}
        lang={lang}
        title={pageData.name || ''}
        data={pageData}
      >
        <ArtistSingle lang={lang} {...pageData} />
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (props) => {
  return await handleStaticProps({ ...props, query })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('artist')
}

export default ArtworkTemplate
