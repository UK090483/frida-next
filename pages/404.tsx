import { handleStaticProps } from '@lib/queries/handleStaticProps'
import { GetStaticProps } from 'next'
import React from 'react'

import Layout from 'pageBuilder/Layout/Layout'
import { pageQuery, PageResult } from 'PageTypes/Page/pageQueries'
import Header from '@components/generic/Header'
import ArtworkCard, {
  artworkCardQuery,
  ArtworkCardResult,
} from 'PageTypes/Artwork/ArtworkCard'
import ArtistCard, {
  artistCardQuery,
  ArtistCardResult,
} from 'PageTypes/Artist/ArtistCard'
import Section from '@components/Section'
import Carousel from '@components/CardCarousel'

interface ErrorPageResult extends PageResult {
  artworks: ArtworkCardResult[]
  artists: ArtistCardResult[]
}
const ErrorPage = (props: any) => {
  if (!props) return <div>404</div>
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

const query = `*[_type == "page" && slug.current == 'about'][0]{
  ${pageQuery},
  'artworks':*[_type == 'artwork'][0...20]{${artworkCardQuery}},
  'artists':*[_type == 'artist'][0...20]{${artistCardQuery}},
}`

export const getStaticProps: GetStaticProps = async () => {
  return await handleStaticProps({ ...{ params: { slug: 'about' } }, query })
}
export default ErrorPage
