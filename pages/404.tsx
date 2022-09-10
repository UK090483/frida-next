import { GetStaticProps } from 'next'

import Layout from 'pageBuilder/Layout/Layout'

import Carousel from '@components/CardCarousel'
import Header from '@components/generic/Header'
import Section from '@components/Section'
import { getSanityClient } from '@lib/sanity.server'
import { layoutQuery } from 'pageBuilder/Layout/layoutQuery'
import ArtistCard, {
  artistCardQuery,
  ArtistCardResult,
} from 'PageTypes/Artist/ArtistCard'
import ArtworkCard, {
  artworkCardQuery,
  ArtworkCardResult,
} from 'PageTypes/Artwork/ArtworkCard'

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
    <Layout
      title={'mu'}
      header={<Header initialColor={'white'} title={'404'} nav={true}></Header>}
    >
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

const query = `{
  'artworks':*[_type == 'artwork'][0...20]{${artworkCardQuery}},
  'artists':*[_type == 'artist'][0...20]{${artistCardQuery}},
  ${layoutQuery()}
}`

export const getStaticProps: GetStaticProps = async () => {
  const data = await sanity.fetch(query)

  return {
    props: {
      data,
    },
  }
}
export default ErrorPage
