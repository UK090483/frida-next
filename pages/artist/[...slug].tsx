import Layout from '@components/generic/Layout'
import { usePage } from '@lib/queries/usePage'
import { getAllDocPathsCached } from '@lib/queries/fetchDocPathApi'
import { handleStaticProps } from '@lib/queries/handleStaticProps'
import { site } from '@lib/queries/pageQueries'
import Error from '@pages/404'
import ArtistSingle from 'contentTypes/Artist/ArtistSingle'
import {
  artworkCardQuery,
  ArtworkCardResult,
} from 'contentTypes/Artwork/ArtworkCard'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { FridaLocation } from 'types'
import { SiteResult } from '@lib/queries/cache'

export const artistSingleView = `
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
  slug: string
  name: string | null
  description: string | null
  description_en: string | null
  webLink: string | null
  instagramLink: string | null
  relatedArtworks: ArtworkCardResult[]
  site: SiteResult
}

type ArtworkTemplateProps = {
  data: ArtistPageResult
  lang: FridaLocation
  slug: string
}

const query = `
        *[_type == "artist" && slug.current == $slug][0]{
          ${artistSingleView},
        }
      `

const ArtworkTemplate: React.FC<ArtworkTemplateProps> = (props) => {
  const { data, lang, slug } = props
  const { pageData, isError } = usePage({ slug, query, data })

  if (isError) {
    return <Error />
  }
  return (
    <>
      <Layout
        lang={lang}
        title={pageData.name || ''}
        navItems={pageData?.site?.navigation?.items}
        data={pageData}
      >
        <ArtistSingle lang={lang} {...pageData} />
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  return await handleStaticProps({ params, locale, query })
}

export const getStaticPaths: GetStaticPaths = async () => {
  return await getAllDocPathsCached('artist')
}

export default ArtworkTemplate
