import { GetStaticProps } from 'next'

import Layout from 'pageBuilder/Layout/Layout'

import Carousel from 'components/CardCarousel'
import Header from 'components/generic/Header'
import Section from 'components/Section'
import { getSanityClient } from 'lib/Sanity/sanity.server'
import { layoutQuery } from 'pageBuilder/Layout/layoutQuery'
import ArtistCard from 'PageTypes/Artist/ArtistCard'
import ArtworkCard from 'PageTypes/Artwork/ArtworkCard'
import {
  ArtistCardResult,
  artistCardQuery,
} from 'PageTypes/Artist/ArtistCard.query'
import {
  ArtworkCardResult,
  artworkCardQuery,
} from 'PageTypes/Artwork/ArtworkCard.query'

interface ErrorPageResult {
  artworks: ArtworkCardResult[]
  artists: ArtistCardResult[]
}

const sanity = getSanityClient()
const ErrorPage = (props: any) => {
  if (!props.data) return <div>404</div>
  const data = props.data as ErrorPageResult

  const { artists, artworks } = data

  return (
    <Layout>
      <Section backgroundColor="pink" className="py-52">
        <h1 className="header-medium">
          Ups 404 Diese Seite gibt es leider nicht !
        </h1>
      </Section>

      <Carousel
        header="Latest Artworks"
        items={artworks.map((item) => (
          <ArtworkCard key={item.slug} type="carousel" {...item} />
        ))}
      />

      <Carousel
        bgColor="pink"
        header="Latest Artists"
        items={artists.map((item) => (
          <ArtistCard key={item.slug} type="carousel" {...item} />
        ))}
      />
    </Layout>
  )
}

const query = (locale: string) => `{
  'artworks':*[_type == 'artwork'][0...20]{${artworkCardQuery}},
  'artists':*[_type == 'artist'][0...20]{${artistCardQuery}},
  ${layoutQuery(locale)}
}`

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const _locale: string = locale === 'en' ? 'en' : ''
  const data = await sanity.fetch(query(_locale))

  return {
    props: {
      data,
    },
  }
}
export default ErrorPage
