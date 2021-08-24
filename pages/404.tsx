import { handleStaticProps } from '@lib/queries/handleStaticProps'
import { GetStaticProps } from 'next'
import React from 'react'
import { body } from 'pageBuilder/pageBuilderQueries'
import Layout from '@components/generic/Layout'
import { PageResult } from 'PageTypes/Page/pageQueries'
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
import { useRouter } from 'next/router'
export const pageQuery = `
...,
'slug':slug.current,
footer->{${body}},
${body}
'site':'getSite'
`
interface ErrorPageResult extends PageResult {
  artworks: ArtworkCardResult[]
  artists: ArtistCardResult[]
}
const ErrorPage = (props: any) => {
  const { locale } = useRouter()
  if (!props) return <div>404</div>
  const data = props.data as ErrorPageResult
  const { site, artists, artworks } = data

  const lang = locale === 'en' ? 'en' : 'de'
  return (
    <Layout
      preview={false}
      lang={'en'}
      title={'mu'}
      data={data}
      header={
        <Header
          initialColor={'white'}
          title={'404'}
          nav={true}
          navItems={site?.navigation?.items}
          lang={'en'}
        ></Header>
      }
    >
      <Section backgroundColor="pink" className="py-52">
        <h1 className="header-medium">
          Ups 404 Diese Seite gibt es leider nicht !
        </h1>
      </Section>

      <Carousel
        header="Latest Artworks"
        items={artworks.map((item) => (
          <ArtworkCard lang={lang} key={item.slug} type="carousel" {...item} />
        ))}
      />

      <Carousel
        bgColor="pink"
        header="Latest Artists"
        items={artists.map((item) => (
          <ArtistCard key={item.slug} type="carousel" {...item} lang={lang} />
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
